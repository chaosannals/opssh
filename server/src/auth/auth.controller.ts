import { Controller, Get, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { Public } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Get("touch")
    @Public()
    touch() {
        return {
            code: 0,
            message: 'Ok',
        };
    }

    @Get("validate")
    validate() {
        return {
            code: 0,
            message: 'Ok',
        };
    }

    @Post("login")
    @Public()
    @UseGuards(LocalAuthGuard)
    async login(@Request() req) {
        return this.authService.login(req.employee);
    }

    @Get("captcha")
    @Public()
    captcha(@Req() req, @Res() res) {
        const captcha = this.authService.makeCaptcha();
        req.session.code = captcha.text;
        res.type('image/svg+xml');
        res.send(captcha.data);
    }
}
