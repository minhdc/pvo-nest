import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { get } from 'http';
import * as j from "jsonwebtoken"
@Controller('auth')
export class AuthController {
    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    public async googleCallback(@Req() req, @Res() res) {
        const jwtValue: string = req.user.jwt;
        if (jwtValue) {
            res.json(jwtValue)
        }
        else
            res.redirect('http://localhost:3000/login/failure');
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    public async googleSignIn() {
        //oauth2 google
        console.log("oauth2 google at auth controller")
    }

    @Get('protected')
    @UseGuards(AuthGuard('jwt'))
    protectedResource() {
        return "jwt is workinggg"
    }





}
