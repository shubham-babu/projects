import { NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  Resolver,
  Subscription,
  ResolveField,
} from '@nestjs/graphql';
import { User } from './models/user.model';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/user';
import { AuthGuard } from 'src/auth/auth.guard';
@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {
    console.log('UserResolver constructor');
  }

  @Query((returns) => User)
  @UseGuards(AuthGuard)
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
  users(@Parent() parent: User): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Mutation((returns) => User)
  async createUser(@Args('input') createUser: RegisterUserDto): Promise<User> {
    const user = await this.userService.createUser(createUser);
    return user;
  }
  @Mutation((returns) => User)
  async updateUser(
    @Args('id') id: number,
    @Args('input')
    updateUser: {
      name: string;
      email: string;
    },
  ): Promise<User> {
    const user = await this.userService.updateUser(id, updateUser);
    return user;
  }

  @Mutation((returns) => Boolean)
  async deleteUser(@Args('id') id: number) {
    return this.userService.remove(id);
  }
}
