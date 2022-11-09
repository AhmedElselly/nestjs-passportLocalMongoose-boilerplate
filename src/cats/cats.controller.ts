import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
    constructor(private catService: CatsService) {}

    @Post('create')
    async create(@Req() req: Request, @Res() res: Response): Promise<any> {
        const createCat = this.catService.create(req);
        return res.json({message: 'Created a new cat'});
    }

    @Get()
    async index(@Res() res: Response): Promise<any> {
        return this.catService.findAll(res);
    }
}
