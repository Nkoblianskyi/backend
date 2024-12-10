import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product, Color, Dimension, Image } from '@prisma/client';

interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  width: string;
  height: string;
  depth: string;
  colors: string[];
  category?: string;
  rating?: number;
  reviewCount?: number;
  mainImage?: string;
  specialOffer?: boolean;
  popular?: boolean;
}

interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  width?: string;
  height?: string;
  depth?: string;
  colors?: string[];
  category?: string;
  rating?: number;
  reviewCount?: number;
  mainImage?: string;
  specialOffer?: boolean;
  popular?: boolean;
}

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) { }

  // Створення нового продукту
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
        category, // Категорія
        rating, // Рейтинг
        reviewCount, // Кількість відгуків
        mainImage, // Головне зображення
        specialOffer, // Спеціальна пропозиція
        popular, // Популярний продукт
        Image: {
          create: {
            url: imageUrl, // Зображення
          },
        },
        Dimension: {
          create: {
            type: 'custom', // Тип розміру
            value: `${width}x${height}x${depth}`, // Розміри як рядок
            width, // Ширина
            height, // Висота
            depth, // Глибина
          },
        },
        Color: {
          create: colors.map((color) => ({
            name: color, // Створення кольорів
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

  // Отримання всіх продуктів з усіма їхніми деталями
  async getAllProducts(): Promise<Product[]> {
    return this.prisma.product.findMany({
      include: {
        Image: true,
        Dimension: true,
        Color: true,
      },
    });
  }

  // Отримання продукту за його ID
  async getProductById(productId: number): Promise<Product | null> {
    console.log(`Fetching product with id: ${productId}`); // Логування ID
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
      console.error('Error fetching product:', error); // Логування помилок
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

    // Оновлення зображення
    if (imageUrl) {
      updateData.Image = { update: { url: imageUrl } };
    }

    // Оновлення розмірів (переконвертовуємо числові значення у строки)
    if (width || height || depth) {
      updateData.Dimension = {
        update: {
          width: width ? String(width) : undefined,
          height: height ? String(height) : undefined,
          depth: depth ? String(depth) : undefined,
        },
      };
    }

    // Оновлення кольорів
    if (colors) {
      updateData.Color = {
        deleteMany: {}, // Видалення старих кольорів
        create: colors.map((color) => ({ name: color })), // Додавання нових кольорів
      };
    }

    // Оновлюємо продукт в базі даних
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

  async getRandomRecommendedProducts(excludedProductId: number, limit: number = 5): Promise<Product[]> {
    // Вибірка випадкових продуктів, не включаючи поточний продукт
    const randomProducts = await this.prisma.product.findMany({
      where: {
        NOT: {
          id: excludedProductId, // Виключаємо поточний продукт
        },
      },
      take: limit, // Кількість товарів, які потрібно отримати
      orderBy: {
        id: 'asc', // Можна використовувати інші стратегії для випадковості
      },
    });

    return randomProducts;
  }

  // Видалення продукту
  async deleteProduct(productId: number): Promise<void> {
    await this.prisma.product.delete({
      where: { id: productId },
    });
  }
}
