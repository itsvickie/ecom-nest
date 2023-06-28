import {
  Catch,
  HttpStatus,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const { statusResponse, messageResponse } =
      this.transformResponseObject(exception);

    response.status(statusResponse).json({
      timestamp: new Date().toISOString(),
      statusCode: statusResponse,
      response: messageResponse,
    });
  }

  private transformResponseObject(exception: HttpException) {
    let statusResponse = exception.getStatus();
    let messageResponse: string | object = exception.getResponse();

    if (typeof messageResponse === 'object') {
      statusResponse = HttpStatus.UNPROCESSABLE_ENTITY;
      messageResponse = (messageResponse as any).message;
    }

    return { statusResponse, messageResponse };
  }
}
