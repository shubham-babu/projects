import { Field, ID, ObjectType } from '@nestjs/graphql';
import { loggerMiddleware } from '../middlewares/logger.middleware';

@ObjectType({ description: 'user ' })
export class User {
  @Field((type) => ID, { middleware: [loggerMiddleware] })
  name: string;

  @Field((type) => [String], { middleware: [loggerMiddleware] })
  email: string;
}
