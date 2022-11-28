import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../interfaces/user.interface';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: User, private jwt: JwtService) {}
  async create(req, res): Promise<any> {
    try {
      const user: any = new this.userModel(req.body);
      await user.setPassword(req.body.password);
      user.save((err, user) => {
        if (err) return res.status(400).json({ err });
        return res.json(user);
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: 'Something went wrong' });
    }
  }
  
  async login(userData, res, next) {
    // console.log({userData})
    const {email, password} = userData
    const { user } = await this.userModel.authenticate()(
      email,
      password,
    );
    if (!user)
      return res
        .status(400)
        .json({ message: "Email and password don't match" });
    
    const {username, _id} = user;
    // console.log(process.env)
    const token = this.jwt.sign({email, username, _id});
    return res.json({token, user});
  }

  async findAll(res): Promise<any> {
    const users = await this.userModel.find();
    return res.json(users);
  }

  async getUser(req, res) {
    const user = await this.findOneByEmail(req.body.email);
    return res.json(user);
  }

  // private methods
  private async findOneByEmail(email: string) {
    
    const user = await this.userModel.findOne({ email });
    console.log('here');
    return user;
  }
}
