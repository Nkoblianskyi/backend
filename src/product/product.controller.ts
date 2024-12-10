import { Controller, Get, Post, Param, Body, Delete, Put, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Controller('api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  async createProduct(@Body() productData: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(productData);
  }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    const productId = parseInt(id, 10);

    if (isNaN(productId)) {
      throw new NotFoundException('Product ID must be a valid number');
    }

    return this.productService.getProductById(productId);
  }

  @Get(':id/recommended')
  async getRecommendedProducts(@Param('id') id: string): Promise<Product[]> {
    const productId = parseInt(id, 10);

    if (isNaN(productId)) {
      throw new NotFoundException('Product ID must be a valid number');
    }

    return this.productService.getRandomRecommendedProducts(productId);
  }


  @Put(':id')
  async updateProduct(@Param('id') id: number, @Body() productData: UpdateProductDto): Promise<Product> {
    return this.productService.updateProduct(id, productData);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<void> {
    return this.productService.deleteProduct(id);
  }
}
