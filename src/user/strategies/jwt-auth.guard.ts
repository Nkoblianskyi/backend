import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private usersService: UserService) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = await this.usersService.findById(request.user.id);

        if (!user) {
            throw new Error('User not found');
        }

        return super.canActivate(context) as boolean;
    }
}
