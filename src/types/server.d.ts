import type { Locals } from 'express';

export interface IUserLocals extends Locals {
  id: string;

  [key: string]: unknown;
}
