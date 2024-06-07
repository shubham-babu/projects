import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private db: DatabaseService) {}

  // Add a new method that returns all users
  async getAllUsers() {
    console.log('UserService.getAllUsers');
    return this.db.user.findMany();
  }

  // Add a new method that returns a single user
  async getSingleUser(id: number) {
    return this.db.user.findUnique({
      where: { id: Number(id) },
    });
  }

  // Add a new method that creates a user
  async createUser(data: { name: string; email: string }) {
    return this.db.user.create({
      data: {
        name: data.name,
        email: data.email,
      },
    });
  }

  // Add a new method to update a user
  async updateUser(id: number, data: { name: string; email: string }) {
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
    return this.db.user.delete({
      where: { id: Number(id) },
    });
  }
}
