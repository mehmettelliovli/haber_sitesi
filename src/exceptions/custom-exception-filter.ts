import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { /*Request*/ Response } from 'express';
import { CustomException } from './custom-exception';

@Catch(CustomException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: CustomException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    //const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    // const message = exception.message || ErrorMessages.CUSTOM_ERROR.message;
    // const errorCode = this.getErrorCodeFromStatus(status);

    response.status(status).json(exception.toJSON());
  }
}
/*
KULLANIMI

@Controller('example')
@UseFilters(CustomExceptionFilter)
export class ExampleController {
  @Get('error')
  throwError() {
    throw new CustomException('This is a custom error', HttpStatus.BAD_REQUEST);
  }
}

*/
