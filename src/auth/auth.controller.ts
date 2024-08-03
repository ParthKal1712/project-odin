import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotImplementedException,
  Post,
} from '@nestjs/common';
import { type_auth_authenticateOutput } from './auth.z';
import { AuthService } from './auth.service';
import { LoginInputDto, z_loginOutputDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: LoginInputDto
  ): Promise<type_auth_authenticateOutput | null> {
    try {
      const result = await this.authService.authenticate(body);
      return result;
    } catch (error) {
      throw new NotImplementedException(error);
    }
  }
}
