import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];

        if (!authHeader) {
            console.log('Authorization Header is missing');
            throw new UnauthorizedException('No token provided or invalid format');
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            console.log('Invalid Authorization Header format');
            throw new UnauthorizedException('Token is missing in the Authorization header');
        }

        console.log('Authorization Header is valid. Token:', token);
        return super.canActivate(context) as boolean;
    }
}
