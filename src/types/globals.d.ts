import type session from 'express-session';

declare module 'express-session' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface SessionData extends session.Session {
    userId: string;
    cookie: session.Cookie;
  }
}
