import { NextFunction, Request, Response } from 'express';
import HttpException from '../lib/exceptions';
 
function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  console.log(error.stack)
  response
    .status(status)
    .json({error: { status: status, message: message }})
}
 
export default errorMiddleware;