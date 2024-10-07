import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { IncorrectDataType, InternalError } from '../../errors/index.js';
import Log from '../../tools/logger/index.js';
import errLogger from '../../tools/logger/logger.js';
import type { IFullError, IUserLocals } from '../../types/index.js';
import type { Express } from 'express';
import { randomUUID } from 'crypto';

export default class Middleware {
  generateMiddleware(app: Express): void {
    app.use(express.json({ limit: '10kb' }));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(
      cors({
        origin: '*',
        credentials: true,
      }),
    );

    app.use((_req: express.Request, res, next: express.NextFunction) => {
      res.header('Content-Type', 'application/json;charset=UTF-8');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });

    // Analuyze
    app.use((req: express.Request, res: express.Response<unknown, IUserLocals>, next: express.NextFunction) => {
      res.locals.id = randomUUID();
      Log.time(res.locals.id);

      res.once('finish', () => {
        Log.endTime(res.locals.id, { path: req.path });
      });

      next();
    });
  }

  generateErrHandler(app: Express): void {
    app.use(
      (err: express.Errback | IFullError, req: express.Request, res: express.Response, _next: express.NextFunction) => {
        errLogger
          .error('Caught new generic error')
          .error(`Caused by ${req.ip ?? 'unknown ip'}`)
          .error(JSON.stringify(err));
        const error = err as IFullError;

        if (error.message.includes('is not valid JSON')) {
          Log.error('Middleware', 'Received req is not of json type', error.message, error.stack);
          const { message, name, status } = new IncorrectDataType();
          return res.status(status).json({ message, name });
        }
        if (error.name === 'SyntaxError') {
          Log.error('Middleware', 'Generic err', error.message, error.stack);
          const { message, code, name, status } = new InternalError();
          return res.status(status).json({ message, code, name });
        }
        if (error.code !== undefined) {
          const { message, code, name, status } = error;
          return res.status(status).json({ message, code, name });
        }
        Log.error('Middleware', 'Generic err', error.message, error.stack);
        const { message, code, name, status } = new InternalError();
        return res.status(status).json({ message, code, name });
      },
    );
  }
}
