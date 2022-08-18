import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String, required : true},
    password:{type:String , required : true}
})
export interface User{
    id:String;
    username:String;
    email:String;
    password:String
}