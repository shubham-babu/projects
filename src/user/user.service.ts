import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { User } from './models/user.model';

@Injectable()
export class UserService {
  constructor(private db: DatabaseService) {}

  // Add a new method that returns all users
  async getAllUsers(
    params: {
      email?: string;
      name?: string;
    } = {},
  ) {
    const condition = { where: {} };
    if (params.email) {
      condition.where['email'] = params.email;
    }
    return this.db.user.findMany(condition);
  }

  // Add a new method that returns a single user
  async getSingleUser(id: number) {
    return this.db.user.findUnique({
      where: { id: Number(id) },
    });
  }

  // Add a new method that creates a user
  async createUser(data: User) {
    const user = await this.getAllUsers({ email: data.email });
    if (user.length) throw new ConflictException('User is already exist.');
    return this.db.user.create({
      data: {
        name: data.name,
        email: data.email,
      },
    });
  }

  // Add a new method to update a user
  async updateUser(id: number, data: User) {
    const user = await this.getAllUsers({ email: data.email });
    if (user.length && user.find((el: User & { id: number }) => el.id != id))
      throw new ConflictException('Email is already exist.');
    return this.db.user.update({
      where: { id: Number(id) },
      data: {
        name: data.name,
        email: data.email,
      },
    });
  }

  // Add a new method to remove a user
  async remove(id: number) {
    const user = await this.getSingleUser(id);
    if (!user) throw new NotFoundException('id is invalid');
    return this.db.user.delete({
      where: { id: Number(id) },
    });
  }
}
