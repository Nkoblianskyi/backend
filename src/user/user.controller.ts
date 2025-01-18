import { Controller, Get, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('profile')
    getProfile(@Request() req) {
        console.log("Authorization header:", req.headers.authorization);
        if (!req.user) {
            console.log("No user found in request");
            throw new Error("No user found in request");
        }
        return this.userService.getProfile(req.user.id);
    }

    @Put('profile')
    @UseGuards(AuthGuard)
    async updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateProfile(req.user.id, updateUserDto);
    }
}
