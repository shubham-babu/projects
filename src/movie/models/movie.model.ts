import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'movie ' })
export class Movie {
  @Field((type) => ID)
  name: string;

  @Field((type) => [String])
  description: string;

  @Field((type) => [String!]!)
  genres: String[];

  @Field((type) => [String])
  imageUrl: string;
}
