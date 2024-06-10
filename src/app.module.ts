import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { MovieController } from './movie/movie.controller';
import { MovieService } from './movie/movie.service';
import { MovieModule } from './movie/movie.module';
import { UserFavoriteMovieModule } from './user-favorite-movie/user-favorite-movie.module';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: [join(process.cwd(), './src/user/user.graphql')],
      // definitions: {
      //   path: join(process.cwd(), './src/user/graphql.schema.ts'),
      //   //outputAs: 'class'
      // }
    }),
    MovieModule,
    UserFavoriteMovieModule,
  ],
  controllers: [AppController, UserController, MovieController],
  providers: [AppService, DatabaseService, MovieService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    console.log('AppModule configure');
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
