import { Test, TestingModule } from '@nestjs/testing';
import { UserFavoriteMovieResolver } from './user-favorite-movie.resolver';

describe('UserFavoriteMovieResolver', () => {
  let resolver: UserFavoriteMovieResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFavoriteMovieResolver],
    }).compile();

    resolver = module.get<UserFavoriteMovieResolver>(UserFavoriteMovieResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
