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
    signin(@Body() body:CreateUserDto){
        return this.authService.signin(
            body.email,
            body.password,
            body.username,
        );
    }

    @Post('local/signup')
    signup(@Body() body:CreateUserDto){
        return this.authService.signup(
            body.email,
            body.password,
            body.username,
        )
    }


}