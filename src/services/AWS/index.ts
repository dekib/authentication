import CONFIG from '../../config';
import { AWSConfig } from '../../entities';

const { ACCESS_KEY, SECRET_KEY, AWS_REGION, ENDPOINT } = CONFIG;

export const awsConfig: AWSConfig = {
  region: AWS_REGION,
  endpoint: ENDPOINT,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY
};
