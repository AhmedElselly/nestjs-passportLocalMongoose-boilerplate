import { Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt_auth.guard';
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

	@UseGuards(JwtAuthGuard)
	@Get(':postId')
	async getPost(@Param('postId') postId: string, @Req() req: Request, @Res() res: Response): Promise<any> {
		console.log(req.isAuthenticated(), req.user)
		return this.postService.getPost(postId, req, res);
	}
}
