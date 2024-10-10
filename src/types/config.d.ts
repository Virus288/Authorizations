export interface IConfigInterface {
  mongoURI: string;
  port: number;
  corsOrigin: string[];
  redisURI: string;
  myAddress: string;
}
