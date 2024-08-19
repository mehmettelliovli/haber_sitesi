import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

export class ExceptionHelper {
  constructor() {}

  async sendErrorResponse500(
    response: Response,
    message: string,
    data?: any,
    //errorCode:
  ) {
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message,
      data,
    });
  }
}
