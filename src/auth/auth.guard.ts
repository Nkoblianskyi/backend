import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface JwtPayload {
    id: string;
    email: string;
    role: string;
    name: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        // Перевірка наявності токену
        console.log('Authorization Header:', authHeader);

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.error('Invalid or missing token in Authorization header');
            throw new UnauthorizedException('No token provided or invalid format');
        }

        const token = authHeader.split(' ')[1];

        try {
            const user = this.jwtService.verify<JwtPayload>(token);
            console.log('Decoded Token:', user);
            request.user = user;
            return true;
        } catch (error) {
            console.error('Token verification error:', error.message);
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
