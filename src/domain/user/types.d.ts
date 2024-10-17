import type mongoose from 'mongoose';

export interface IUserEntity {
  _id?: string | mongoose.Types.ObjectId;
  login: string;
  email: string;
  password: string;
}

export interface IUser extends IUserEntity, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}
