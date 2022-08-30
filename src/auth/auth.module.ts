import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports : [UsersModule , JwtModule.register({
    secret:'super-secret-cat'
  })],
  providers: [AuthService  , JwtStrategy],
  controllers:[AuthController]

})
export class AuthModule {}
