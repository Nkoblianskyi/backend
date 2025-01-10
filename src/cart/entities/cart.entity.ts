import { Product, User } from '@prisma/client';

export class CartEntity {
    id: string;
    userId: string;
    productId: number;
    quantity: number;
    createdAt: Date;
    product?: Product;
    user?: User;

    constructor(partial: Partial<CartEntity>) {
        Object.assign(this, partial);
    }
}
