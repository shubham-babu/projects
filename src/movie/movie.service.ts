import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Movie } from './models/movie.model';

@Injectable()
export class MovieService {
  constructor(private readonly db: DatabaseService) {}

  async getAllMovies(
    params: {
      name?: string;
      description?: string;
      genres?: string[];
      imageUrl?: string;
    } = {},
  ) {
    return this.db.movie.findMany();
  }

  async getSingleMovie(id: number) {
    return this.db.movie.findUnique({
      where: { id: Number(id) },
    });
  }

  // Add a new method that creates a movie
  async createMovie(data: Movie) {
    return this.db.movie.create({
      data: {
        name: data.name,
        description: data.description,
        genres: data.genres as string[],
        imageUrl: data.imageUrl,
      },
    });
  }

  // Add a new method to update a movie
  async updateMovie(id: number, data: Movie) {
    return this.db.movie.update({
      where: { id: Number(id) },
      data: {
        name: data.name,
        description: data.description,
        genres: data.genres as string[],
        imageUrl: data.imageUrl,
      },
    });
  }

  // Add a new method to remove a user
  async remove(id: number) {
    const movie = await this.getSingleMovie(id);
    if (!movie) throw new NotFoundException('id is invalid');
    return this.db.movie.delete({
      where: { id: Number(id) },
    });
  }
}
