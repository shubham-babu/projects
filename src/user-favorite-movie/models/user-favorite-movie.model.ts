import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'userFavoriteMovie' })
export class UserFavoriteMovie {
  @Field((type) => ID)
  userId: number;

  @Field((type) => ID)
  movieId: number;
}
