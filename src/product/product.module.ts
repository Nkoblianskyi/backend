import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { ProductController } from './product.controller';

@Module({
  imports: [PrismaModule],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
