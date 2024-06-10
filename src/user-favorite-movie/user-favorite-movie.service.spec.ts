import { Test, TestingModule } from '@nestjs/testing';
import { UserFavoriteMovieService } from './user-favorite-movie.service';

describe('UserFavoriteMovieService', () => {
  let service: UserFavoriteMovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFavoriteMovieService],
    }).compile();

    service = module.get<UserFavoriteMovieService>(UserFavoriteMovieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
