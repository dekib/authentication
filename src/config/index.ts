import environment from 'dotenv';

const env = environment.config();
if (env.error) {
  throw env.error;
}

const {
  // Default config
  PORT,
  NODE_ENV,

  // AWS
  ACCESS_KEY,
  SECRET_KEY,
  AWS_REGION,
  ENDPOINT,

  JWT_SECRET
} = process.env;

export enum ApplicationEnv {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development'
}

const ENV: ApplicationEnv = NODE_ENV as ApplicationEnv || ApplicationEnv.DEVELOPMENT;

const CONFIG = {
  // Default config
  NODE_ENV: ENV,
  PORT: +PORT,

  // AWS
  ACCESS_KEY,
  SECRET_KEY,
  AWS_REGION,
  ENDPOINT,

  JWT_SECRET
};

export default CONFIG;
