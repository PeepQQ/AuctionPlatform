import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { Request, Response } from 'express';
import { verifyToken } from 'src/helpers/helpers';
import { AuthService } from './auth.service';
  
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const req = context.switchToHttp().getRequest<Request>();
      const res = context.switchToHttp().getResponse<Response>();
  
      const accessToken = req.cookies.accessToken;
      const refreshToken = req.cookies.refreshToken;
  
      try {
        const payload = verifyToken(accessToken);
        req.user = payload;
        return true;
      } catch {
        try {
          const tokens = await this.authService.refresh(refreshToken);
  
          await this.authService.setCookieTokens(
            tokens.accessToken,
            tokens.refreshToken,
            res,
          );
  
          const newPayload = verifyToken(tokens.accessToken);
          req.user = newPayload;
  
          return true;
  
        } catch {
          await this.authService.logout(res);
          throw new UnauthorizedException();
        }
      }
    }
}