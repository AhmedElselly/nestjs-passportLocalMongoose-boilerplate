import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      if(req.isAuthenticated()){
        next();
      } else {
        return res.status(401).json({message: 'unAuthorized'});
      }
      // const token = req.headers.authorization.split(' ')[1];
      // if(token){
      //   next();
      // } else {
      //   return res.status(401).json({message: 'unAuthorized'});
      // }
      
    } catch (err) {
      return res.status(401).json({message: 'unAuthorized'});
    }
  }
}
