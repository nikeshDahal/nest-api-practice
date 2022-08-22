import * as mongoose from 'mongoose';
// import {Exclude} from 'class-transformer'

export const UserSchema = new mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String, required : true},
    password:{type:String , required : true}
})
export class User{
    id:String;
    username:String;
    email:String;
    password:String;
}