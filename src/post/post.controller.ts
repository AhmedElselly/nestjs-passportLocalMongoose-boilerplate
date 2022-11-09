import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

	@Post('create')
  async create(@Req() req: Request, @Res() res: Response): Promise<any> {
		const post = await this.postService.create(req, res);
		return post;
	}

	@Get()
	async index(@Req() req: Request, @Res() res: Response): Promise<any> {
		const posts = await this.postService.index(req, res);
		return posts;
	}
}
