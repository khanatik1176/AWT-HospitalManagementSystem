import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtSecrets } from '../strategy/jwt.strategy';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService,private reflector: Reflector,) { }
 
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        
        if (!token) {
            throw new UnauthorizedException("Please Login To The Website");
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: jwtSecrets.secret
                }
            );
            request['user'] = payload;
            
           
            const requiredRoles = this.reflector.get<string[]>('role', context.getHandler()); // Fetch roles metadata
            console.log('Required Roles:', requiredRoles);
            if (!requiredRoles || requiredRoles.length === 0) {
                
                return true;
            }
           
            
            const userRoles: string[] = payload.role;
            console.log('User Roles:', userRoles);
            const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
            console.log('Has Required Role:', hasRequiredRole);
            if (hasRequiredRole==false) {
                throw new UnauthorizedException("You do not have permission to access this resource");
            }
        } 
        
        catch {
            throw new UnauthorizedException("You do not have permission to access this data");
        }
        return true;
    }
 
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}