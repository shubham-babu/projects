import {Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'user ' })
export class User {
  @Field(type => ID)
  name: string;

  @Field(type => [String])
  email: string;
}