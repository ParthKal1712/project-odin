import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authToken_withBearer = request.headers.authorization;
    const authToken = authToken_withBearer?.split(' ')[1];

    if (!authToken) {
      throw new UnauthorizedException();
    }

    try {
      const authTokenPayload = await this.jwtService.verifyAsync(authToken);
      request.user = {
        id: authTokenPayload.sub,
        username: authTokenPayload.username,
      };
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }
}
