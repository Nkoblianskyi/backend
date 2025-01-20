// src/user/user.controller.ts

import { Controller, Get, Put, Body, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from './strategies/jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async getProfile(@Request() req) {
        if (!req.user) {
            console.log('No user found in request object');
            throw new UnauthorizedException('Unauthorized');
        }
        return this.userService.getProfile(req.user.id);
    }

    @Put('profile')
    @UseGuards(JwtAuthGuard)
    async updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
        if (!req.user) {
            console.log('No user found in request object');
            throw new UnauthorizedException('Unauthorized');
        }
        return this.userService.updateProfile(req.user.id, updateUserDto);
    }
}
