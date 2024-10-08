import type mongoose from 'mongoose';

export interface IUserEntity {
  name: string;
}

export interface IUser extends IUserEntity, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}
