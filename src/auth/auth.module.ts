import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { EnvModule } from 'src/env/env.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvService } from 'src/env/env.service';
import { z_env } from 'src/env/env.z';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => z_env.parse(env),
    }),
    EnvModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: new EnvService(new ConfigService()).get('JWT_SECRET'),
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
