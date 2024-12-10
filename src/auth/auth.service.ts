import { Injectable, ConflictException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { RegisterDto } from './dto/register.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  async register(dto: RegisterDto): Promise<User> {
    const { email, password, role, phone, name } = dto;


    if (!phone || !name) {
      throw new BadRequestException('Phone and name are required');
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }


    const validRoles = ['user', 'admin'];
    if (!validRoles.includes(role)) {
      throw new BadRequestException('Invalid role');
    }


    const hashedPassword = await bcrypt.hash(password, 12);


    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        phone,
        name,
      },
    });

    return user;
  }

  // Функція логіну
  async login(email: string, password: string): Promise<{ token: string }> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const jwtSecret = this.configService.get('JWT_SECRET');

      const token = this.jwtService.sign(
        { id: user.id, role: user.role },
        { secret: jwtSecret, expiresIn: '1h' }
      );

      return { token };
    } catch (error) {
      throw new UnauthorizedException('An error occurred during login: ' + error.message || 'Login failed');
    }
  }
}
