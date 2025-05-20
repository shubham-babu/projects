import { Injectable, Catch, ArgumentsHost } from '@nestjs/common';
import {
  GqlArgumentsHost,
  GqlExceptionFilter as NestGqlExceptionFilter,
} from '@nestjs/graphql';
import { HttpException } from '@nestjs/common';

@Injectable()
@Catch(HttpException)
export default class GqlExceptionFilter implements NestGqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const context = gqlHost.getContext();
    const response = context.res;
    if (!response) {
      console.log('No response object found');
      return;
    }
    response.json({
      statusCode: exception.getStatus(),
      message: exception.message,
    });
  }
}
