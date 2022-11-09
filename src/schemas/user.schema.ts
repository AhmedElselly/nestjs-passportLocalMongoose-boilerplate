import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, {
  Schema,
  PassportLocalModel,
  PassportLocalDocument,
  PassportLocalSchema,
  model,
  HydratedDocument,
} from 'mongoose';
import * as passportLocalMongoose from 'passport-local-mongoose';

export interface UserDocument extends PassportLocalDocument {
  username: String;
  email: String;
}

export const UserSchema = new Schema(
  {
    username: String,
    email: String,
  },
  {
    timestamps: true,
  },
);

UserSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
});

const UserModel1: PassportLocalModel<PassportLocalDocument> = mongoose.model(
  'User',
  UserSchema,
);

export default UserModel1;
