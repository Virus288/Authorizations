import { describe, expect, it } from '@jest/globals';
import supertest from 'supertest';
import State from '../../../src/tools/state.js'
import * as errors from '../../../src/errors/index.js';
import type { IFullError } from '../../../src/types/index.js';
import { IRegisterDto } from '../../../src/application/oidc/register/types.js';

describe('Register user', () => {
  const body = {
    login: 'Test123',
    email: "test@test.test",
    password: "VeryStrongPassword123."
  } as IRegisterDto;

  describe('Should throw', () => {
    describe('No data passed', () => {
      it('Missing login', async () => {
        const target = new errors.MissingArgError('login');
        const data = structuredClone(body)

        const res = await supertest(State.router.getServer())
          .post('/reg')
          .send({ ...data, login: undefined });

        const reqBody = res.body as { error: IFullError };

        expect(reqBody.error.message).toEqual(target.message);
      });

      it('Missing password', async () => {
        const target = new errors.MissingArgError('password');
        const data = structuredClone(body)

        const res = await supertest(State.router.getServer())
          .post('/reg')
          .send({ ...data, password: undefined });

        const reqBody = res.body as { error: IFullError };

        expect(reqBody.error.message).toEqual(target.message);
      });

      it('Missing email', async () => {
        const target = new errors.MissingArgError('email');
        const data = structuredClone(body)

        const res = await supertest(State.router.getServer())
          .post('/reg')
          .send({ ...data, email: undefined });

        const reqBody = res.body as { error: IFullError };

        expect(reqBody.error.message).toEqual(target.message);
      });
    });

    describe("Data invalid", () => {
      it('Email is not email', async () => {
        const target = new errors.IncorrectArgTypeError('Email invalid');
        const data = structuredClone(body)

        const res = await supertest(State.router.getServer())
          .post('/reg')
          .send({ ...data, email: 'asd' });

        const reqBody = res.body as { error: IFullError };

        expect(reqBody.error.message).toEqual(target.message);
      });

      it('Password invalid', async () => {
        const target = new errors.IncorrectArgTypeError('password should be more than 6 and less than 200 characters');
        const data = structuredClone(body)

        const res = await supertest(State.router.getServer())
          .post('/reg')
          .send({ ...data, password: 'asd' });

        const reqBody = res.body as { error: IFullError };

        expect(reqBody.error.message).toEqual(target.message);
      });

      it('Login invalid', async () => {
        const target = new errors.IncorrectArgTypeError('login should be more than 3 and less than 30 characters');
        const data = structuredClone(body)

        const res = await supertest(State.router.getServer())
          .post('/reg')
          .send({ ...data, login: 'd' });

        const reqBody = res.body as { error: IFullError };

        expect(reqBody.error.message).toEqual(target.message);
      });
    });

    describe('Should pass', () => {
      it('Registered', async () => {
        const res = await supertest(State.router.getServer())
          .post('/reg')
          .send(body);

        expect(res.status).toEqual(200);
      });
    });
  });
})
