import type { IUserLocals } from './server';
import type express from 'express';

export type IResponse = express.Response<unknown, IUserLocals>;
