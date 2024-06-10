import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Movie } from './models/movie.model';
import { MovieService } from './movie.service';
import { NotFoundException } from '@nestjs/common';

@Resolver((of) => Movie)
export class MovieResolver {
  constructor(private readonly movieService: MovieService) {}
  // query movie resolver
  @Query((returns) => Movie)
  async movie(@Args('id') id: number): Promise<Movie> {
    const movie = await this.movieService.getSingleMovie(id);
    if (!movie) {
      throw new NotFoundException(id);
    }
    return movie;
  }

  // query movies resolver
  @Query((returns) => [Movie])
  movies(): Promise<Movie[]> {
    return this.movieService.getAllMovies();
  }

  @Mutation((returns) => Movie)
  async createMovie(
    @Args('input')
    createMovie: {
      name: string;
      description: string;
      genres: string[];
      imageUrl: string;
    },
  ): Promise<Movie> {
    const user = await this.movieService.createMovie(createMovie);
    return user;
  }
  @Mutation((returns) => Movie)
  async updateMovie(
    @Args('id') id: number,
    @Args('input')
    payloadData: {
      name: string;
      description: string;
      genres: string[];
      imageUrl: string;
    },
  ): Promise<Movie> {
    return await this.movieService.updateMovie(id, payloadData);
  }

  @Mutation((returns) => Boolean)
  async deleteMovie(@Args('id') id: number) {
    return this.movieService.remove(id);
  }
}
