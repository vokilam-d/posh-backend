import { BadRequestException, Body, Controller, Get, Post, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { AuthService } from '../services/auth.service';
import { LoginResponseDto } from '../dtos/login-response.dto';
import { toDto } from '../../../utils/to-dto.util';
import { Request } from 'express';
import { UserDto } from '../../user/dtos/user.dto';
import { Public } from '../decorators/public.decorator';
import { ResponseDto } from '../../../dtos/response.dto';
import { RefreshDto } from '../dtos/refresh.dto';
import { TokenPairDto } from '../dtos/token-pair.dto';

@Controller('auth')
@UsePipes(new ValidationPipe({ transform: true }))
@Public()
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {
  }

  @Get('me')
  async getMe(@Req() req: Request): Promise<ResponseDto<UserDto | null>> {
    const user = await this.authService.getUserByRequest(req);
    return new ResponseDto(user ? toDto(UserDto, user) : null);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<ResponseDto<LoginResponseDto>> {
    const result = await this.authService.login(loginDto);
    if (!result) {
      throw new BadRequestException(`We couldn't find an account with this username and password combination`);
    }

    const dtoContents: LoginResponseDto = {
      ...result.user,
      id: null,
      accessToken: result.tokenPair.accessToken,
      refreshToken: result.tokenPair.refreshToken,
    };

    return new ResponseDto(toDto(LoginResponseDto, dtoContents));
  }

  @Post('refresh')
  async refresh(@Body() refreshDto: RefreshDto): Promise<ResponseDto<TokenPairDto>> {
    const tokenPair = await this.authService.refresh(refreshDto.refreshToken);
    if (!tokenPair) {
      throw new BadRequestException();
    }

    return new ResponseDto(toDto(TokenPairDto, tokenPair));
  }
}
