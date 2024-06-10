import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Movie } from 'src/movie/models/movie.model';

@ObjectType({ description: 'UserFavoriteMovie' })
export class UserFavoriteMovie {
  @Field((type) => ID)
  userId: number;

  @Field((type) => ID)
  movieId: number;

  // @Field(type => Movie)
  // movie: Movie;
}
