import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { AuthService } from './auth.service';

@Module({
  imports :[MongooseModule.forFeature([{name:'User',schema:UserSchema}])],
  providers: [UsersService , AuthService],
  controllers: [UsersController]
})
export class UsersModule {}
