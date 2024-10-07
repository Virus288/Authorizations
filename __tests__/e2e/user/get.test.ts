import { describe, expect, it } from '@jest/globals';
import supertest from 'supertest';
import State from '../../../src/tools/state.js'
import * as errors from '../../../src/errors/index.js';
import type { IFullError } from '../../../src/types/index.js';
import { IGetUserDto } from '../../../src/application/user/get/types.js';
import mongoose from 'mongoose';

describe('Get new user', () => {
  const body = {
    name: 'test',
    id: new mongoose.Types.ObjectId().toString()
  } as IGetUserDto;

  describe('should throw', () => {
    describe('No data passed', () => {
      it('Missing name and id', async () => {
        const target = new errors.MissingArgError('Name, Id');
        const data = structuredClone(body)

        data.name = undefined as unknown as string
        data.id = undefined as unknown as string

        const res = await supertest(State.router.getServer())
          .get('/users')
          .send(data);

        const reqBody = res.body as { error: IFullError };

        expect(reqBody.error.message).toEqual(target.message);
      });
    });

    describe("Data is incorrect", () => {
      it('Id is not mongo id', async () => {
        const target = new Error('id should be objectId');
        const data = structuredClone(body)

        data.id = '2'

        const res = await supertest(State.router.getServer())
          .get('/users')
          .send(data);

        const reqBody = res.body as { error: IFullError };

        expect(reqBody.error.message).toEqual(target.message);
      });
    })
  });

  describe('should pass', () => {
    it('Get', async () => {
      const addRes = await supertest(State.router.getServer())
        .post('/users')
        .send(body);

      const addReqBody = addRes.body as { data: { id: string } };

      expect(addReqBody.data).not.toBeUndefined();

      const getRes = await supertest(State.router.getServer())
        .get('/users')
        .send({ id: addReqBody.data.id });

      const getReqBody = getRes.body as { data: { name: string } };
      expect(getReqBody.data.name).toEqual('test');
    });
  });
});
