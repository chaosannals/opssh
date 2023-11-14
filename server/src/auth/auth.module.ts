import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Permission } from './permission.entity';
import { APP_GUARD } from '@nestjs/core';
import { ApiModule } from 'src/api/api.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ApiModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    }),
    TypeOrmModule.forFeature([Permission]),
  ],
  exports: [
    AuthService,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    //该模块 全局验证
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [
    AuthController,
  ],
})
export class AuthModule { }
