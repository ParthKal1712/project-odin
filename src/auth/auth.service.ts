import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  type_auth_authenticateInput,
  type_auth_authenticateOutput,
  type_auth_validateUserInput,
  type_auth_validateUserOutput,
} from './auth.z';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async authenticate(
    input: type_auth_authenticateInput
  ): Promise<type_auth_authenticateOutput | null> {
    const user = await this.validateUser(input);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.signIn(user);
  }

  async validateUser(
    input: type_auth_validateUserInput
  ): Promise<type_auth_validateUserOutput | null> {
    const user = await this.userService.findUserByUsername(input.username);

    if (user && user.password) {
      if (user.password === input.password) {
        return {
          id: user.id,
          username: user.username,
          name: user.name,
        };
      } else {
        throw new UnauthorizedException();
      }
    }

    throw new UnauthorizedException();
  }

  async signIn(
    user: type_auth_validateUserOutput
  ): Promise<type_auth_authenticateOutput | null> {
    const payload = { username: user.username, sub: user.id };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      ...user,
      accessToken,
    };
  }
}
