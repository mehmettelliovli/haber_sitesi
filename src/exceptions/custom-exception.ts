import { HttpException, HttpStatus } from '@nestjs/common';
import { IResult } from 'src/user/interface/result.interface';

export class CustomException extends HttpException implements IResult<string> {
  constructor(
    public resultCode,
    public message: string,
    statusCode: HttpStatus,
  ) {
    super(message, statusCode);
  }

  toJSON(): IResult<any> {
    return {
      resultCode: this.resultCode,
      message: this.message,
      payload: `error`,
    };
  }
}
