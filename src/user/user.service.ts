// src/user/user.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async findById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }

    async getProfile(userId: string): Promise<User> {
        console.log('Fetching user with ID:', userId);
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            console.log('No user found for ID:', userId);
            throw new Error('User not found');
        }
        console.log('Found user:', user);
        return user;
    }

    async updateProfile(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
        return this.prisma.user.update({
            where: { id: userId },
            data: updateUserDto,
        });
    }
}
