import mongoose from 'mongoose';
import type { IUser } from '../../domain/user/types.js';

export const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: [true, 'Login not provided'],
    minlength: [2, 'Min length is 2 characters'],
    maxlength: [30, 'Max name length is 30 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please pass valid email'],
    unique: true,
    minlength: [2, 'Min length is 2 characters'],
    maxlength: [50, 'Max name length is 50 characters'],
  },
  password: {
    type: String,
    required: [true, 'Password not provided'],
    minlength: [6, 'Min length is 6 characters'],
  },
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
