import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { CartModule } from './cart/cart.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    ProductModule,
    CartModule,
    AuthModule,
    UserModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [PrismaService],
})
export class AppModule {}
