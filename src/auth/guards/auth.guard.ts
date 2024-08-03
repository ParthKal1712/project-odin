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
    console.log('Received Access Token', authToken);

    if (!authToken) {
      throw new UnauthorizedException();
    }

    try {
      console.log(
        'Sign Secret during unsign',
        new ConfigService().get('JWT_SECRET')
      );
      const authTokenPayload = await this.jwtService.verifyAsync(authToken);
      request.user = {
        id: authTokenPayload.sub,
        username: authTokenPayload.username,
      };
      return true;
    } catch (error) {
      console.log('ERROR', error);
      throw new UnauthorizedException();
    }
  }
}
