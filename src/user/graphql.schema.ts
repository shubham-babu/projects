
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class MovieInput {
    name: string;
    description: string;
    genres: string[];
    imageUrl: string;
}

export class UserFavoriteMovieInput {
    userId: string;
    movieId: string;
}

export class CreateUserInput {
    name: string;
    email: string;
}

export class UpdateUserInput {
    name?: Nullable<string>;
    email?: Nullable<string>;
}

export abstract class IQuery {
    abstract movie(id: string): Nullable<Movie> | Promise<Nullable<Movie>>;

    abstract movies(): Nullable<Nullable<Movie>[]> | Promise<Nullable<Nullable<Movie>[]>>;

    abstract userFavoriteMovie(id: string): Nullable<UserFavoriteMovie> | Promise<Nullable<UserFavoriteMovie>>;

    abstract userFavoriteMovies(userId?: Nullable<string>, movieId?: Nullable<string>): Nullable<Nullable<UserFavoriteMovie>[]> | Promise<Nullable<Nullable<UserFavoriteMovie>[]>>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
}

export abstract class IMutation {
    abstract createMovie(input: MovieInput): Nullable<Movie> | Promise<Nullable<Movie>>;

    abstract updateMovie(id: string, input: MovieInput): Nullable<Movie> | Promise<Nullable<Movie>>;

    abstract deleteMovie(id: string): Nullable<Movie> | Promise<Nullable<Movie>>;

    abstract addUserFavoriteMovie(input: UserFavoriteMovieInput): Nullable<UserFavoriteMovie> | Promise<Nullable<UserFavoriteMovie>>;

    abstract deleteUserFavoriteMovie(id: string): Nullable<UserFavoriteMovie> | Promise<Nullable<UserFavoriteMovie>>;

    abstract createUser(input: CreateUserInput): Nullable<User> | Promise<Nullable<User>>;

    abstract updateUser(id: string, input: UpdateUserInput): Nullable<User> | Promise<Nullable<User>>;

    abstract deleteUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export class Movie {
    id: string;
    name: string;
    description: string;
    genres: string[];
    imageUrl: string;
}

export class UserFavoriteMovie {
    id: string;
    userId: string;
    movieId: string;
    user: User;
    movie: Movie;
}

export class User {
    id: string;
    name: string;
    email: string;
}

type Nullable<T> = T | null;
