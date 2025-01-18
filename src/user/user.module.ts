import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from './strategies/jwt-auth.guard';
@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtAuthGuard ],
})
export class UserModule { }
