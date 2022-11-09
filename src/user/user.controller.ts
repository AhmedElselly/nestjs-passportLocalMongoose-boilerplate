import { Controller, Get, Next, Post, Req, Res } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}
    @Post('register')
    async register(@Req() req: Request, @Res() res: Response): Promise<any> {
        return this.userService.create(req, res);
    }

    @Post('login')
    async login(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction): Promise<any> {
        return this.userService.login(req, res, next);
    }

    @Get()
    async index(@Req() req: Request, @Res() res: Response): Promise<any> {
        // return res.json({message: 'user controller is working'})
        return this.userService.findAll(res);
    }

    @Get('email')
    async getUser(@Req() req: Request, @Res() res: Response): Promise<any> {
        const user = await this.userService.getUser(req, res);
        return user;
    }
}
