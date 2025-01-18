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
        console.log("Fetching user with ID:", userId);
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
            });
            console.log("Found user:", user);
            return user;
        } catch (error) {
            console.error("Error fetching user:", error);
            throw new Error('Unable to fetch user');
        }
    }

    async updateProfile(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
        return this.prisma.user.update({
            where: { id: userId },
            data: updateUserDto,
        });
    }
}
