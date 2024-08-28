import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Encryptor } from '../../../utils/encryptor.util';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {

  private logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users.map(user => user.toJSON());
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    return user?.toJSON();
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username }).exec();
    return user?.toJSON();
  }

  async createUser(createDto: CreateUserDto): Promise<User> {
    const duplicate = await this.getUserByUsername(createDto.username);
    if (duplicate) {
      throw new ConflictException(`User with username "${createDto.username}" already exists"`);
    }

    const userContents: User = {
      _id: uuid(),
      username: createDto.username,
      passwordHash: createDto.password ? await Encryptor.hash(createDto.password) : null,
      phoneNumber: createDto.phoneNumber,
      role: createDto.role,
      createdAtIso: new Date().toISOString(),
      updatedAtIso: new Date().toISOString(),
    };
    const user = await this.userModel.create(userContents);

    this.logger.debug(`Created user "${user.username}"`);

    return user.toJSON();
  }

  async updateUser(userId: string, updateDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException(`Not found user with id "${userId}"`);
    }

    const { password, ...rest } = updateDto;
    if (password) {
      user.passwordHash = await Encryptor.hash(password);
    }
    for (const [key, value] of Object.entries(rest)) {
      if (value === undefined) {
        continue;
      }

      user[key] = value;
    }

    user.updatedAtIso = new Date().toISOString();
    await user.save();
    this.logger.debug(`Updated user "${user.username}"`);

    return user.toJSON();
  }

  async deleteUser(userId: string): Promise<User> {
    const user = await this.userModel.findByIdAndDelete(userId).exec();
    if (!user) {
      throw new NotFoundException(`Not found user with id "${userId}"`);
    }

    this.logger.debug(`Deleted user "${user.username}"`);

    return user.toJSON();
  }
}
