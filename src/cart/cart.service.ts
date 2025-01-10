import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CartEntity } from './entities/cart.entity';

@Injectable()
export class CartService {
    constructor(private readonly prisma: PrismaService) { }

    async getCart(userId: string): Promise<CartEntity[]> {
        const cartItems = await this.prisma.cart.findMany({
            where: { userId },
            include: { product: true },
        });
        return cartItems.map((item) => new CartEntity(item));
    }

    async addToCart(userId: string, productId: number, quantity: number): Promise<CartEntity> {
        const existingItem = await this.prisma.cart.findFirst({
            where: { userId, productId },
        });

        let cartItem;
        if (existingItem) {
            cartItem = await this.prisma.cart.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity },
            });
        } else {
            cartItem = await this.prisma.cart.create({
                data: {
                    userId,
                    productId,
                    quantity,
                },
            });
        }
        return new CartEntity(cartItem);
    }

    async removeFromCart(userId: string, productId: number): Promise<void> {
        await this.prisma.cart.deleteMany({
            where: { userId, productId },
        });
    }
}
