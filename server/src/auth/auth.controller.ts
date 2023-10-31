import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
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

    @Post("login")
    @Public()
    @UseGuards(LocalAuthGuard)
    async login(@Request() req) {
        return this.authService.login(req.employee);
    }
}
