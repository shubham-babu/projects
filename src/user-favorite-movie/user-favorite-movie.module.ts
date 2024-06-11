import { Module } from '@nestjs/common';
import { UserFavoriteMovieService } from './user-favorite-movie.service';
import { UserFavoriteMovieResolver } from './user-favorite-movie.resolver';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [UserFavoriteMovieService, UserFavoriteMovieResolver],
  exports: [UserFavoriteMovieService],
})
export class UserFavoriteMovieModule {}
