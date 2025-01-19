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

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('No token provided or invalid format');
        }

        const token = authHeader.split(' ')[1];

        try {
            const user: JwtPayload = this.jwtService.verify<JwtPayload>(token);
            request.user = {
                id: user.id,
                email: user.email,
                role: user.role,
                name: user.name,
            };
            return true;
        } catch (error) {
            console.error('Token verification error:', error.message);
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
