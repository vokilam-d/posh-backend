import * as process from 'node:process';

export const config = {
  port: 3600,
  mongoUri: process.env.MONGO_URI,
  fileSizeLimitBytes: 10 * 1000 * 1000, // 10 MB
};
