import { Injectable, NotFoundException  ,HttpException , HttpStatus} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import {Repository}
import { Model } from 'mongoose';
import { User } from './user.model';
var mongoose = require('mongoose');
@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async createUser(username: string, email: string, password: string) {
    const newUser = new this.userModel({
      username,
      email,
      password,
    });
    const user = await newUser.save();
    return user;
  }

  async find(email:string){
    return await this.userModel.find({email});
  }

  async findOne(id: string) {
      return await this.userModel.findOne({ _id: id });
  }

  async findAll() {
      return await this.userModel.find();
  }

  async updateUser(id: string, attributes: Partial<User>) {
    const user = await this.userModel.findOne({ _id: id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const updatedUser = Object.assign(user, attributes);
    const userAfterSavingInDatabase = await updatedUser.save();
    return userAfterSavingInDatabase;
  }

  async deleteUser(id: string) {
    const user = await this.userModel.findOne({ _id: id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userModel.deleteOne({ _id: id }).exec();
    return user;
  }
}
