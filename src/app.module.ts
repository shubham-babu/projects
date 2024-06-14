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
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { upperDirectiveTransformer } from './common/directives/upper-case.directive';
import GqlExceptionFilter from './common/filters/gql-exception.filter';
import { APP_FILTER } from '@nestjs/core';
@Module({
  imports: [
    UserModule,
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: [join(process.cwd(), './src/*/*.graphql')],
      transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // sortSchema: true,
      context: ({ req, res }) => {
        console.log(req.headers.authorization);
        //const user = AuthService.validateToken(req.headers.authorization)
        return { req, res };
      },
      // definitions: {
      //   path: join(process.cwd(), './src/user/graphql.schema.ts'),
      //   outputAs: 'class',
      // },
      // formatError: (error: any) => {
      //   console.log(error)
      //   const graphQLFormattedError = {
      //     status: error.extensions?.status || 500,
      //     message: error.message,
      //   };
      //   return graphQLFormattedError;
      // },
    }),
    MovieModule,
    UserFavoriteMovieModule,
    AuthModule,
  ],
  controllers: [AppController, UserController, MovieController],
  providers: [
    AppService,
    DatabaseService,
    MovieService,
    AuthService,
    // {
    //   provide: APP_FILTER,
    //   useClass: GqlExceptionFilter,
    // }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    console.log('AppModule configure');
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
