import { AuthService } from "./auth.service";
import { Body, Controller, Post, Get, Headers } from "@nestjs/common";
import type { SignInData, SignUpData } from "./types/auth.types";




@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signUp')
    async signUp(@Body() body: SignUpData) {
        const data = await this.authService.signUp(body);
        return data;
    }

    @Post('signIn')
    async signIn(@Body() body: SignInData) {
        const data = await this.authService.signIn(body);
        return data;
    }

    @Get('me')
    async me(@Headers() headers: Headers) {
        return this.authService.me(headers);
    }

    @Post('refresh')
    async refresh(@Headers() headers: Headers) {
        return this.authService.refresh(headers);
    }
}