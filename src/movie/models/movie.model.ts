import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'movie ' })
export class Movie {
  @Field(() => ID)
  name: string;

  @Field(() => [String])
  description: string;

  @Field(() => [String!]!)
  genres: string[];

  @Field(() => [String])
  imageUrl: string;
}
