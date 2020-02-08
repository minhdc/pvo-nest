import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google.strategy';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [ConfigModule,UsersModule],
  providers: [AuthService,GoogleStrategy,JwtStrategy,ConfigService],
  controllers: [AuthController]
})
export class AuthModule {}
