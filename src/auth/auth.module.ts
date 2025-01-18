  import { Module } from '@nestjs/common';
  import { JwtModule } from '@nestjs/jwt';
  import { ConfigModule, ConfigService } from '@nestjs/config';
  import { AuthController } from './auth.controller';
  import { AuthService } from './auth.service';
  import { PrismaService } from '../../prisma/prisma.service';

  @Module({
    imports: [
      ConfigModule.forRoot(),
      JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '1h' },
        }),
        inject: [ConfigService],
      }),
    ],
    controllers: [AuthController],
    providers: [AuthService, PrismaService],
    exports: [JwtModule],
  })
  export class AuthModule { }
