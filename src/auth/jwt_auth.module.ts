import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './jwt_strategy.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'jknkjnskdjngkjfnsdklgnskljgnskljngkjsndfkjgnskljgnkjsndfkjgnskjng',
      signOptions: {expiresIn: '60s'}
    })],
  providers: [JwtStrategy],
  exports: []
})
export class AuthModule {}