import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductController } from './product.controller';

@Module({
  imports: [PrismaModule], // Імпортуємо PrismaModule, щоб мати доступ до PrismaService
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService], // Експортуємо ProductService для використання в інших частинах проекту
})
export class ProductModule {}
