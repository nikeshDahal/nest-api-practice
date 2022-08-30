import { Controller, Post , Body} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import {serialize} from '../interceptors/serialize.interceptor';
import { UserDto } from "src/users/dtos/user.dto";


@Controller('/auth')
@serialize(UserDto)
export class AuthController {
    constructor(private authService : AuthService ){}
    
    @Post('local/signin')
     async signin(@Body() body:CreateUserDto){
        const [user,tokens]= await this.authService.signin(
            body.email,
            body.password,
            body.username,
        );
        return [user,tokens]
    }

    @Post('local/signup')
    async signup(@Body() body:CreateUserDto){
        const {user,tokens}= await  this.authService.signup(
            body.email,
            body.password,
            body.username,
        )
        return[user,tokens]
    }
}