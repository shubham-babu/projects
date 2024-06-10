import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // calculate the time taken to process the request
    const start = Date.now();
    res.on('finish', () => {
      console.log(
        `${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - start}ms`,
      );
    });

    next();
  }
}
