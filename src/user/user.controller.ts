import {
  Controller,
  Redirect,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  HttpException,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';

import { ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';

import { UserService } from './user.service';
@ApiTags('Users')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Add a new route that returns all users
  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  // Add a new route that returns a single user
  @Get('/:id')
  @ApiParam({ name: 'id', type: 'number', required: true })
  async getSingleUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getSingleUser(id);
  }

  // Add a new route that creates a user
  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: { name: { type: 'string' }, email: { type: 'string' } },
    },
  })
  async createUser(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
    @Body('password') password: string,
  ) {
    try {
      return this.userService.createUser({ name, email, phone, password });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Bad Request',
        },
        HttpStatus.BAD_REQUEST,
        { cause: 'User already exists' },
      );
    }
  }

  // Add a new route to update a user
  @Put('/:id')
  @ApiParam({ name: 'id', type: 'number', required: true })
  @ApiBody({
    schema: {
      type: 'object',
      properties: { name: { type: 'string' }, email: { type: 'string' } },
    },
  })
  async updateUser(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
    @Body('phone') password: string,
  ) {
    return this.userService.updateUser(id, { name, email, phone, password });
  }
}
