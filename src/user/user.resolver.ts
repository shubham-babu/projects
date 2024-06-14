import {
  NotFoundException,
  Request,
  SetMetadata,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  Resolver,
  Subscription,
  ResolveField,
  Context,
  Directive,
} from '@nestjs/graphql';
// import { User } from './models/user.model';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/user';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthenticationError } from '@nestjs/apollo';
import { LoggingInterceptor } from './logging.interceptor';
import { User, UserWithPhone, UserWithEmail } from './models/user.model';
import { UserAgs } from './decorators/user.decorator';
import GqlExceptionFilter from '.././common/filters/gql-exception.filter';

const jwt = require('jsonwebtoken');
@Resolver((of) => User)
@UseInterceptors(LoggingInterceptor)
@UseFilters(GqlExceptionFilter)
export class UserResolver {
  constructor(private readonly userService: UserService) {
    console.log('UserResolver constructor');
  }

  @Query('user')
  @UseGuards(AuthGuard)
  @Directive(
    '@deprecated(reason: "This query will be removed in the next version")',
  )
  async user(@Parent() parent: any, @Args('id') id: number): Promise<User> {
    const user = await this.userService.getSingleUser(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @Query((returns) => [User])
  @SetMetadata('roles', ['Admin'])
  @UseGuards(AuthGuard)
  users(
    @Parent() parent: User,
    @Context() ctx: any,
    @UserAgs() user: any,
  ): Promise<Omit<User, 'password'>[]> {
    this.userService.getAllUsers().then(console.log);
    console.log(ctx.req.user, 'Sdf ', user);
    throw new NotFoundException('sdf ');
    return this.userService.getAllUsers();
  }

  resolveType(value: User) {
    console.log('sdf ');
    if ('email' in value) {
      return 'UserWithEmail';
    }
    if ('phone' in value) {
      return 'UserWithPhone';
    }
    return null;
  }

  @ResolveField()
  __resolveType(value: User) {
    console.log('sdf __resolveType');
    if ('email' in value) {
      return 'UserWithEmail';
    }
    if ('phone' in value) {
      return 'UserWithPhone';
    }
    return null;
  }

  @Mutation()
  async createUser(@Args('input') input: RegisterUserDto): Promise<User> {
    console.log(input, 'sdf ');
    const user = await this.userService.createUser(input);
    return user;
  }

  @Mutation()
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const user = await this.userService.getAllUsers({ email });
    if (!user?.length) throw new AuthenticationError('Invalid credentials');

    const token = jwt.sign({ userId: user[0].id }, process.env.APP_SECRET);
    return {
      token,
      user: user[0],
    };
  }

  @Mutation()
  async updateUser(
    @Args('id') id: number,
    @Args('input')
    updateUser: RegisterUserDto,
  ): Promise<User> {
    const user = await this.userService.updateUser(id, updateUser);
    return user;
  }

  @Mutation((returns) => Boolean)
  async deleteUser(@Args('id') id: number) {
    return this.userService.remove(id);
  }
}
