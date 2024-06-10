import { Resolver, Query, Args, Mutation, Parent} from '@nestjs/graphql';
import { UserFavoriteMovieService } from './user-favorite-movie.service';
import { UserFavoriteMovie } from './models/user-favorite-movie.model';
import { User } from 'src/user/models/user.model';

@Resolver(of => UserFavoriteMovie)
export class UserFavoriteMovieResolver {
    constructor(private readonly service: UserFavoriteMovieService){}

    @Query((returns) => UserFavoriteMovie)
    async userFavoriteMovie(@Args("id") id: number){
        return this.service.getSingleUserFavoriteMovie(id);
    }

    @Query((returns) => [UserFavoriteMovie])
    userFavoriteMovies(@Parent() parent: any, @Args() query: any): Promise<UserFavoriteMovie[]>{
        const data =  this.service.getAllUserFavoriteMovies(query);
        return data;
    }

    @Mutation((returns) => UserFavoriteMovie)
    async addUserFavoriteMovie(
      @Args('input') payloadData: UserFavoriteMovie,
    ): Promise<UserFavoriteMovie> {
     const userMovie = await this.service.addUserFavoriteMovie(payloadData);
      return userMovie;
    }

    @Mutation((returns)=> UserFavoriteMovie)
    deleteUserFavoriteMovie(@Args("id") id: number){
        return this.service.remove(id);
    }
}
