import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { LoginDto } from '../dtos/login.dto';
import { Encryptor } from '../../../utils/encryptor.util';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/schemas/user.schema';
import { config } from '../../../config';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RefreshToken } from '../schemas/refresh-token.schema';
import { TokenPairDto } from '../dtos/token-pair.dto';

interface TokenPayload {
  /**
   * user's ID
   */
  sub: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(RefreshToken.name) private readonly refreshTokenModel: Model<RefreshToken>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ user: User; tokenPair: TokenPairDto; } | null> {
    const user = await this.userService.getUserByUsername(loginDto.username);
    if (!user) {
      return null;
    }
    if (!user.passwordHash) {
      return null;
    }

    const isValidPassword: boolean = await Encryptor.validate(loginDto.password, user.passwordHash);
    if (!isValidPassword) {
      return null;
    }
    const userId = user._id.toString();
    const tokenPair = await this.buildTokenPair(userId);
    await this.persistRefreshToken(userId, tokenPair.refreshToken);

    return {
      user,
      tokenPair,
    };
  }

  async refresh(refreshToken: string): Promise<TokenPairDto> {
    try {
      await this.jwtService.verifyAsync(refreshToken);
    } catch (e) {
      return null;
    }

    const activeKey: keyof RefreshToken = 'activeRefreshToken';
    const rotatedKey: keyof RefreshToken = 'rotatedRefreshTokens';
    const foundToken = await this.refreshTokenModel.findOne({
      $or: [
        { [activeKey]: refreshToken },
        { [rotatedKey]: refreshToken },
      ],
    }).exec();

    if (!foundToken || foundToken.isInvalidated) {
      return null;
    }

    if (foundToken.rotatedRefreshTokens.includes(refreshToken)) {
      foundToken.isInvalidated = true;
      await foundToken.save();
      return null;
    }

    const tokenPair = await this.buildTokenPair(foundToken.userId);
    foundToken.rotatedRefreshTokens.push(foundToken.activeRefreshToken);
    foundToken.activeRefreshToken = tokenPair.accessToken;

    return tokenPair;
  }

  async getUserByRequest(request: Request): Promise<User | null> {
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      return null;
    }

    try {
      const payload = await this.jwtService.verifyAsync<TokenPayload>(token);

      const user = await this.userService.getUserById(payload.sub);
      if (!user) {
        return null;
      }

      return user;
    } catch {
      return null;
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async buildTokenPair(userId: string): Promise<TokenPairDto> {
    const accessToken = await this.jwtService.signAsync({ sub: userId }, { expiresIn: config.accessTokenExpiresIn });
    const refreshToken = await this.jwtService.signAsync({ sub: userId }, { expiresIn: config.refreshTokenExpiresIn });

    return { accessToken, refreshToken };
  }

  private async persistRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const refreshTokenDocContents: RefreshToken = {
      userId: userId,
      activeRefreshToken: refreshToken,
      rotatedRefreshTokens: [],
      createdAtIso: new Date().toISOString(),
      activeIssuedAtIso: new Date().toISOString(),
      isInvalidated: false,
    };
    await this.refreshTokenModel.create(refreshTokenDocContents);
  }
}
