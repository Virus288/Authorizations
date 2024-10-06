import mongoose from 'mongoose';
import type { IUser } from '../../domain/user/types.js';

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name not provided'],
  },
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
