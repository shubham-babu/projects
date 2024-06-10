import {
    Injectable,
    ConflictException,
    NotFoundException,
  } from '@nestjs/common';
  import { DatabaseService } from 'src/database/database.service';
  import { UserFavoriteMovie } from './models/user-favorite-movie.model';

@Injectable()
export class UserFavoriteMovieService {
    constructor(private db: DatabaseService) {}
  
    // Add a new method that returns all user's favorite movies
    async getAllUserFavoriteMovies(
      params: {
        name?: string;
        userId?: number;
        movieId?: number;
      } = {},
    ) {
      const condition = { 
        where: {},
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            },
            movie: {
                select: {
                    id: true,
                    name: true,
                    description: true,
                    genres: true,
                    imageUrl: true
                }
            }
        }
      };
      if (params.userId) {
        condition.where['userId'] = Number(params.userId);
      }
      if(params.movieId){
        condition.where["movieId"] = Number(params.movieId);
      }
    //   if(params.name){ 
    //     condition.include.movie["name"] = {
    //         contains: params.name
    //     };
    //   }
      //console.log(JSON.stringify(condition), "sdf ")
      return this.db.userFavoriteMovies.findMany(condition);
    }
  
    // Add a new method that returns a single user's favorite movie
    async getSingleUserFavoriteMovie(id: number) {
      return this.db.userFavoriteMovies.findUnique({
        where: { id: Number(id) },
      });
    }
  
    // Add a new method that creates a user
    async addUserFavoriteMovie(data: UserFavoriteMovie) { 
      const movie = await this.getAllUserFavoriteMovies({ userId: data.userId, movieId: data.movieId });
      console.log(movie,"df ")
      if (movie.length) throw new ConflictException('Movie is already exists.');
      return this.db.userFavoriteMovies.create({
        data: {
          userId: Number(data.userId),
          movieId: Number(data.movieId),
        },
      });
    }
  
    // Add a new method to remove a user's favorite movie
    async remove(id: number) {
      const user = await this.getSingleUserFavoriteMovie(id);
      if (!user) throw new NotFoundException('id is invalid');
      return this.db.user.delete({
        where: { id: Number(id) },
      });
    }
}
  