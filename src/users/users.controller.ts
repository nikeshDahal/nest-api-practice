import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
  NotFoundException,
  UseGuards,
  Request
} from '@nestjs/common';

// import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { currentUser } from 'src/auth/currentUser';
// import { AuthService } from 'src/auth/auth.service';


@Controller('auth')
@serialize(UserDto)
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(
    private usersService: UsersService,
    // private authService: AuthService,
  ) {}


  @Get()
  async getMyProfile(@currentUser() req:any) {
    const user = await this.usersService.findOne(req._id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get()
  async findAllUsers(@Request() req:any) {
    console.log('find all users :', req.user)
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
