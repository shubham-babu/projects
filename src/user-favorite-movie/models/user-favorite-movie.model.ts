import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'UserFavoriteMovie' })
export class UserFavoriteMovie {
  @Field(() => ID)
  userId: number;

  @Field(() => ID)
  movieId: number;

  // @Field(type => Movie)
  // movie: Movie;
}
