import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../auth/types/user.interface';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Get()
    @UseGuards(AuthGuard)
    async getCart(@Request() req: { user: User }) {
        const userId = String(req.user.id);
        return this.cartService.getCart(userId);
    }

    @Post()
    @UseGuards(AuthGuard)
    async addToCart(@Body() data: { productId: number; quantity?: number }, @Request() req: { user: User }) {
        const userId = String(req.user.id);
        return this.cartService.addToCart(userId, data.productId, data.quantity || 1);
    }

    @Delete(':productId')
    @UseGuards(AuthGuard)
    async removeFromCart(@Param('productId', ParseIntPipe) productId: number, @Request() req: { user: User }) {
        const userId = String(req.user.id);
        return this.cartService.removeFromCart(userId, productId);
    }
}
