import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    PrismaModule,  // Імпортуємо PrismaModule для доступу до бази даних
    ConfigModule.forRoot(),  // Ініціалізація конфігурацій
    JwtModule.registerAsync({
      imports: [ConfigModule],  // Використовуємо ConfigModule для доступу до секрету
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),  // Використовуємо секрет з конфігурацій
        signOptions: { expiresIn: '1h' },  // Час життя токена
      }),
      inject: [ConfigService],  // Інжектуємо ConfigService
    }),
  ],
})
export class AuthModule { }
