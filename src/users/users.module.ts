import { Module, UnsupportedMediaTypeException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { UserDto } from './dtos/user.dto';
// import { AuthService } from 'src/auth/auth.service';
// import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports :[MongooseModule.forFeature([{name:'User',schema:UserSchema}])],
  exports:[UsersService , UserDto],
  providers: [UsersService , UserDto ],
  controllers: [UsersController]
})
export class UsersModule {}
