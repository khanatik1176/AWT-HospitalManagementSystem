import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class OrgNameStoreMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (req.headers['x-database-name']) {
            process.env.DATABASE_NAME = req.headers['x-database-name'];
            console.log(`Database name set to: ${process.env.DATABASE_NAME}`);
        }
        next();
    }
}