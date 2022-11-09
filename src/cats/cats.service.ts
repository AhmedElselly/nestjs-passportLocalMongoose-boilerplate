import { Injectable } from '@nestjs/common';
import { Cat } from 'src/interfaces/cats.interface';
import { InjectModel } from '@nestjs/mongoose';
// import { Cat, CatDocument } from '../schemas/cat.schema';
import { Model } from 'mongoose';
import { CreateCatDto } from './create-cat.dto';


@Injectable()
export class CatsService {
  constructor(@InjectModel('Cat') private catModel: Model<Cat>) {}

  async create(req): Promise<any> {
    const createdCat = new this.catModel(req.body);
    createdCat.owner = req.body.userId;
    return createdCat.save();
  }

  async findAll(res): Promise<Cat[]> {
    const cats = await this.catModel.find().populate('owner');
    return res.json(cats);
  }
}
