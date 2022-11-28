import { Body, Controller, Get, Next, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody } from '@nestjs/swagger';
import { NextFunction, Request, Response } from 'express';
import { LoginUserDto } from 'src/dtos/User.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}
    @Post('register')
    async register(@Req() req: Request, @Res() res: Response): Promise<any> {
        return this.userService.create(req, res);
    }

    @Post('login')
    @ApiBody({type: LoginUserDto})
    async login(@Body() userDto: LoginUserDto, @Res() res: Response, @Next() next: NextFunction): Promise<any> {
        return this.userService.login(userDto, res, next);
    }

    @Get()
    async index(@Req() req: Request, @Res() res: Response): Promise<any> {
        return this.userService.findAll(res);
    }

    @Get('email')
    async getUser(@Req() req: Request, @Res() res: Response): Promise<any> {
        const user = await this.userService.getUser(req, res);
        return user;
    }

    @Get('secret')
    async getSecret(@Req() req: Request, @Res() res: Response): Promise<any> {
        return res.json({message:'success'});
    }
}
