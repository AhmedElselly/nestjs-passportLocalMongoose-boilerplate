import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { LoggerMiddleware } from 'src/middlewares/isAuth.middleware';
import { JwtStrategy } from 'src/auth/jwt_strategy.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
    JwtModule.register({
      secret:
        'jknkjnskdjngkjfnsdklgnskljgnskljngkjsndfkjgnskljgnkjsndfkjgnskjng',
      signOptions: { expiresIn: '10d' },
    }),
    JwtStrategy,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: '/users/login', method: RequestMethod.POST },
        { path: '/users/register', method: RequestMethod.POST },
      )
      .forRoutes(UserController);
  }
}
