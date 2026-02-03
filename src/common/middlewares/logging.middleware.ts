import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl } = req;
    const start = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const elapsedTime = Date.now() - start;
      const logMessage = `${new Date().toLocaleString()} - ${method} ${originalUrl} ${statusCode} - ${elapsedTime} ms`;
      if (req['user']) {
        const { id, name, lastname } = req['user'];
        console.log('Id:', id);
        console.log('Usuario:', `${name}${lastname ? ' ' + lastname : ''}`);
      }
      if (method === 'POST' || method === 'PUT') {
        if (req.body) {
          console.log({ ...req.body });
        }
      }
      console.log(logMessage);
    });

    next();
  }
}
