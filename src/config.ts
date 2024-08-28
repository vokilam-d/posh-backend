export const config = {
  port: 3600,
  mongoUri: process.env.MONGO_URI,
  fileSizeLimitBytes: 10 * 1000 * 1000, // 10 MB
  jwtSecret: process.env.JWT_SECRET,
  accessTokenExpiresIn: '1 day',
  refreshTokenExpiresIn: '12 weeks',
};

if (!config.jwtSecret) {
  throw new Error(`No JWT secret provided`);
}
