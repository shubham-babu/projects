import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Movie } from 'src/movie/models/movie.model';
@ObjectType({ description: 'user ' })
export class User {
  @Field((type) => ID)
  name: string;

  @Field((type) => [String])
  email: string;
}
