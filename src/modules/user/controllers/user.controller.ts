import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserDto } from '../dtos/user.dto';
import { toDto } from '../../../utils/to-dto.util';
import { CreateUserDto } from '../dtos/create-user.dto';
import { RoleGuard } from '../../auth/guards/roles.guard';
import { Role } from '../enums/role.enum';
import { ResponseDto } from '../../../dtos/response.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Controller('users')
@UsePipes(new ValidationPipe({ transform: true }))
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get()
  async getAllUsers(): Promise<ResponseDto<UserDto[]>> {
    const users = await this.userService.getAllUsers();

    const dtos = users.map(user => toDto(UserDto, user));
    return new ResponseDto(dtos);
  }

  @Get(':id')
  async getUser(@Param('id') userId: string): Promise<ResponseDto<UserDto>> {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundException(`Not found user with id "${userId}"`);
    }

    return new ResponseDto(toDto(UserDto, user));
  }

  @Post()
  @UseGuards(RoleGuard(Role.Owner))
  async createUser(@Body() createUserDto: CreateUserDto): Promise<ResponseDto<UserDto>> {
    const user = await this.userService.createUser(createUserDto);

    return new ResponseDto(toDto(UserDto, user));
  }

  @Patch(':id')
  @UseGuards(RoleGuard(Role.Owner))
  async updateUser(@Param('id') userId: string, @Body() updateUserDto: UpdateUserDto): Promise<ResponseDto<UserDto>> {
    const user = await this.userService.updateUser(userId, updateUserDto);

    return new ResponseDto(toDto(UserDto, user));
  }

  @Delete(':id')
  @UseGuards(RoleGuard(Role.Owner))
  async deleteUser(@Param('id') userId: string): Promise<ResponseDto<UserDto>> {
    const user = await this.userService.deleteUser(userId);

    return new ResponseDto(toDto(UserDto, user));
  }
}
