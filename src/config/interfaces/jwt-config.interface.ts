import {
  JwtModuleOptions,
  JwtSignOptions,
  JwtVerifyOptions,
} from '@nestjs/jwt';

export interface IJwtConfig extends JwtModuleOptions {
  secret: string;
  accessTokenExpiresIn: string;
  refreshTokenSecret: string;
  refreshTokenExpiresIn: string;
  signOptions?: JwtSignOptions;
  verifyOptions?: JwtVerifyOptions;
}
