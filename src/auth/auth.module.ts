import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/database/database.module';
import { AuthGuard } from './auth.guard';
@Module({
  imports: [DatabaseModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
