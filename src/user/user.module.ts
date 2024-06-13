import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/database/database.module';
import { UserResolver } from './user.resolver';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {
  constructor() {
    console.log('UserModule constructor');
  }
}
