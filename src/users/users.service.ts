import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose'
// import {Repository} 
import {Model} from 'mongoose'
import {User} from './user.model'
@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private userModel :Model<User>){}

    async createUser(username:string, email:string , password : string){
        const newUser = new this.userModel({
            username,
            email,
            password
        });
        const user = await newUser.save();
        console.log(user)
        return user;
    }
}
