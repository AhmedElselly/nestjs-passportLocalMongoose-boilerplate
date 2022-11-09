import { PassportLocalDocument, PassportLocalModel,  } from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';

// export type User = PassportLocalModel<UserDocument>;

export interface User extends PassportLocalModel<UserDocument> {
    email: string;
    username: string;
}

// export interface User extends PassportLocalDocument, PassportLocalModel<UserDocument>{
//   username: string;
//   email: string;
// }

// export class User implements PassportLocalDocument, PassportLocalModel<UserDocument> {
//   username: string;
//   email: string;
// }


// export interface User extends PassportLocalModel<UserDocument> {
//   username: string;
//   email: string;
// }

// export interface AuthenticationResult {
//   user: any;
//   error: any;
// }
