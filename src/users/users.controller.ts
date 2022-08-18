import { Body,Controller , Post} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor( private usersService : UsersService){}
    @Post('/signup')
    createUser( @Body() body:CreateUserDto){
        const user = this.usersService.createUser(body.username, body.email, body.password);
        return user
    }
}
