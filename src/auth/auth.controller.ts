import { Controller, Post, Get, Body, Delete, Param, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
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
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async getMe(@Request() req) {
    console.log('User from AuthGuard:', req.user); // Логування користувача
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
