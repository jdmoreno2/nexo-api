import { registerAs } from '@nestjs/config';
import { Environment } from './env.validation';
import { IAppConfig } from './interfaces/app-config.interface';


// Configuración principal usando registerAs
export default registerAs('app', (): IAppConfig => {
  return {
    env: process.env.NODE_ENV as Environment || Environment.Development,
    name: process.env.APP_NAME || 'MyNestApp',
    port: parseInt(String(process.env.APP_PORT), 10) || 3000,
    apiPrefix: process.env.API_PREFIX || 'api',
    apiVersion: process.env.API_VERSION || 'v1',
    corsEnabled: process.env.CORS_ENABLED === 'true',
  };
});