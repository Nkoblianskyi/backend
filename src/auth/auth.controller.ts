import { Controller, Post, Body, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() body: RegisterDto) {
    try {
      return await this.authService.register(body);
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    try {
      return await this.authService.login(body.email, body.password);
    } catch (error) {
      throw new UnauthorizedException(error.response?.message || 'Login failed');
    }
  }
}
