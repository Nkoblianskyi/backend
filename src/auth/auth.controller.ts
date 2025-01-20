import { Controller, Post, Get, Body, Delete, Param, UseGuards, Request, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<string> {
    if (!loginDto.email || !loginDto.password) {
      throw new BadRequestException('Email and password are required');
    }
    const { token } = await this.authService.login(loginDto.email, loginDto.password);
    return token;
  }

  @Get('me')
  @UseGuards(AuthGuard)  // Захист за допомогою токена
  async getMe(@Request() req) {
    if (!req.user) {
      throw new UnauthorizedException('You are not authorized');
    }
    return req.user;
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteUser(@Param('id') id: string, @Request() req) {
    const userRole = req.user.role;
    if (userRole !== 'admin') {
      throw new UnauthorizedException('You are not authorized to delete this user');
    }
    return this.authService.deleteUser(id);
  }
}
