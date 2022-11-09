import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/interfaces/post.interface';

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private post: Model<Post>) {}

  async create(req, res): Promise<any> {
    const post = new this.post(req.body);
		post.author = req.body.userId;
		post.save((err, post) => {
			if(err) return res.status(400).json({err});
			return res.json(post);
		})
  }


	async index(req, res) {
		const users = await this.post.find().populate('author');
		return res.json(users);
	}
}
