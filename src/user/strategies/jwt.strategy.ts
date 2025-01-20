// src/user/strategies/jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: any) {
        console.log('JWT Payload:', payload);
        const user = await this.userService.findById(payload.sub);
        if (!user) {
            console.log('User not found for payload.sub:', payload.sub);
            throw new UnauthorizedException('User not found');
        }
        console.log('User authenticated:', user);
        return user;
    }
}
