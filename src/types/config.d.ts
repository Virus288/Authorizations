export interface IConfigInterface {
  mongoURI: string;
  port: number;
  corsOrigin: string[];
  redisURI: string;
  myAddress: string;
  session: {
    secret: string;
    secured: boolean;
  };
}
