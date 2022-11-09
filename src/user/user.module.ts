import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import UserModel, { UserSchema } from 'src/schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import passportLocalMongoose from 'passport-local-mongoose';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
    JwtModule.register({
      secret: 'jknkjnskdjngkjfnsdklgnskljgnskljngkjsndfkjgnskljgnkjsndfkjgnskjng',
      // secret: process.env.SECRETKEY,
      signOptions: { expiresIn: '10d' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
