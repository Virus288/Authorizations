import { describe, expect, it } from '@jest/globals';
import supertest from 'supertest';
import State from '../../../src/tools/state.js'
import * as errors from '../../../src/errors/index.js';
import type { IFullError } from '../../../src/types/index.js';
import { IAddUserDto } from '../../../src/application/user/add/types.js';

describe('Add new user', () => {
  const body = {
    name: 'test',
  } as IAddUserDto;

  describe('should throw', () => {
    describe('No data passed', () => {
      it('Missing name', async () => {
        const target = new errors.MissingArgError('name');
        const data = structuredClone(body)

        data.name = undefined as unknown as string

        const res = await supertest(State.router.getServer())
          .post('/users')
          .send(data);

        const reqBody = res.body as { error: IFullError };

        expect(reqBody.error.message).toEqual(target.message);
      });
    });

    describe("Data is incorrect", () => {
      it('Name is too short', async () => {
        const target = new errors.ElementTooShortError('name', 1);
        const data = structuredClone(body)

        data.name = ''

        const res = await supertest(State.router.getServer())
          .post('/users')
          .send(data);

        const reqBody = res.body as { error: IFullError };

        expect(reqBody.error.message).toEqual(target.message);
      });
    })
  });

  describe('should pass', () => {
    it('Add', async () => {
      const res = await supertest(State.router.getServer())
        .post('/users')
        .send(body);

      const reqBody = res.body as { data: string };

      expect(reqBody.data).not.toBeUndefined();
    });
  });
});
