import {
  Body,
  Controller,
  Get,
  Delete,
  Patch,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';

import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { currentUser } from 'src/auth/currentUser';

@Controller('auth')
@serialize(UserDto)
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/profile')
  async getMyProfile(@currentUser() req: any) {
    const user = await this.usersService.findOne(req._id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get('/listUsers')
  async findAllUsers() {
    return await this.usersService.findAll();
  }

  @Delete('/delete')
  async removeUser(@currentUser() req: any) {
    return await this.usersService.deleteUser(req._id);
  }

  @Patch('/update')
  async updateUser(@currentUser() req: any, @Body() body: UpdateUserDto) {
   const updatedUser = await this.usersService.updateUser(req._id, body);
   console.log(updatedUser);
   req=updatedUser
   console.log('request  after update:', req)
   return req;
  }
}
