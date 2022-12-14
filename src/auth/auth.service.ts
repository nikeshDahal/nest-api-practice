import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Request
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { UserDto } from 'src/users/dtos/user.dto';
import { UsersService } from 'src/users/users.service';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(email: string, password: string, username: string) {
    //see if email is in use
    const existUser = await this.userService.findByEmail(email);
    if (existUser.length > 0) {
      throw new BadRequestException('email already taken');
    }

    //hash the pwd
    //1 genrate salt
    const salt = randomBytes(8).toString('hex');
    //1 hash salt and pwd together
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    //3 join the hash and salt
    const hashedPassword = salt + '.' + hash.toString('hex');

    //create a new user and save it
    const user = await this.userService.createUser(
      username,
      email,
      hashedPassword,
    );
    console.log('new-user :', user);

    //generating tokens
    const tokens = this.signUser(username, email, password);

    // return the user
    return {
      user,
      tokens
    }
  }
  async signin(email: string, password: string, username: string) {
    const [user] = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    console.log(user);
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }

    const tokens = this.signUser(username, email, password);
    console.log('signin :',user);
    return [user,tokens]
  }

   signUser(username: string, email: string, password: string) {
    const tokens =  this.jwtService.sign({
      username,
      email,
      password,
    });
    return tokens;
  }
}


