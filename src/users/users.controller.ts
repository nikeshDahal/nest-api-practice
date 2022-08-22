import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
  NotFoundException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
@serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.usersService.createUser(
      body.username,
      body.email,
      body.password,
    );
    return user;
  }

  // @UseInterceptors( new SeralizeInterceptor(UserDto))

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    console.log('running ....')
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get()
  async findAllUsers() {
    return await this.usersService.findAll();
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    return await this.usersService.deleteUser(id);
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return await this.usersService.updateUser(id, body);
  }
}
