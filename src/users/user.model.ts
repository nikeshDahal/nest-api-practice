import * as mongoose from 'mongoose';
// import {Exclude} from 'class-transformer'

export const UserSchema = new mongoose.Schema(
  {
    username: { type: String, trim: true, required: true },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    password: { type: String, required: true, minLength: 5 },
    // tokens: [
    //   {
    //     token: {
    //       type: String,
    //       required: true,
    //     },
    //   },
    // ],
  },
  {
    timestamps: true,
  },
);
export class User {
  id: String;
  username: String;
  email: String;
  password: String;
}

