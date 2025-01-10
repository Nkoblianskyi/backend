import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Product, Color, Dimension, Image } from '@prisma/client';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) { }

  async createProduct(data: CreateProductDto): Promise<Product> {
    const {
      name,
      description,
      price,
      imageUrl,
      width,
      height,
      depth,
      colors,
      category,
      rating,
      reviewCount,
      mainImage,
      specialOffer,
      popular,
    } = data;

    const product = await this.prisma.product.create({
      data: {
        name,
        description,
        price,
        category,
        rating,
        reviewCount,
        mainImage,
        specialOffer,
        popular,
        Image: {
          create: {
            url: `${process.env.API_URL}/images/${imageUrl}`,
          },
        },
        Dimension: {
          create: {
            type: 'custom',
            value: `${width}x${height}x${depth}`,
            width: parseInt(width),
            height: parseInt(height),
            depth: parseInt(depth),
          },
        },
        Color: {
          create: colors.map((color) => ({
            name: color,
          })),
        },
      },
      include: {
        Image: true,
        Dimension: true,
        Color: true,
      },
    });

    return product;
  }

  async getAllProducts(): Promise<Product[]> {
    return this.prisma.product.findMany({
      include: {
        Image: true,
        Dimension: true,
        Color: true,
      },
    });
  }


  async getProductById(productId: number): Promise<Product | null> {
    console.log(`Fetching product with id: ${productId}`);
    try {
      const product = await this.prisma.product.findUnique({
        where: { id: productId },
        include: {
          Image: true,
          Dimension: true,
          Color: true,
        },
      });

      if (!product) {
        console.error(`Product with id: ${productId} not found`);
        throw new Error('Product not found');
      }

      console.log('Fetched product:', product);
      return product;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Internal server error');
    }
  }


  async updateProduct(
    productId: number,
    data: UpdateProductDto
  ): Promise<Product> {
    const {
      name,
      description,
      price,
      imageUrl,
      width,
      height,
      depth,
      colors,
      category,
      rating,
      reviewCount,
      mainImage,
      specialOffer,
      popular,
    } = data;

    const updateData: any = {};

    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (price) updateData.price = price;
    if (category) updateData.category = category;
    if (rating) updateData.rating = rating;
    if (reviewCount) updateData.reviewCount = reviewCount;
    if (mainImage) updateData.mainImage = mainImage;
    if (specialOffer !== undefined) updateData.specialOffer = specialOffer;
    if (popular !== undefined) updateData.popular = popular;

    if (imageUrl) {
      updateData.Image = { update: { url: imageUrl } };
    }

    if (width || height || depth) {
      updateData.Dimension = {
        update: {
          width: width ? parseInt(width) : undefined,
          height: height ? parseInt(height) : undefined,
          depth: depth ? parseInt(depth) : undefined,
        },
      };
    }

    if (colors) {
      updateData.Color = {
        deleteMany: {},
        create: colors.map((color) => ({ name: color })),
      };
    }

    const updatedProduct = await this.prisma.product.update({
      where: { id: productId },
      data: updateData,
      include: {
        Image: true,
        Dimension: true,
        Color: true,
      },
    });

    return updatedProduct;
  }


  async getRandomRecommendedProducts(
    excludedProductId: number,
    limit: number = 5
  ): Promise<Product[]> {
    const randomProducts = await this.prisma.product.findMany({
      where: {
        NOT: {
          id: excludedProductId,
        },
      },
      take: limit,
      orderBy: {
        id: 'asc',
      },
    });

    return randomProducts;
  }

  async deleteProduct(productId: number): Promise<void> {
    await this.prisma.product.delete({
      where: { id: productId },
    });
  }
}
