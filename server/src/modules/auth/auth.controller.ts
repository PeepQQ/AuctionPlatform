import { AuthService } from "./auth.service";
import type { Response } from "express";
import { Body, Controller, Post, Get, Res, UseGuards } from "@nestjs/common";
import type { SignInData, SignUpData } from "./types/auth.types";
import { getVerifyToken, type UserPayload } from "src/helpers/helpers";
import { User } from "../../decorators/user.decorator";
import { AuthGuard } from "./guards/auth.guard";



@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('signUp')
    async signUp(
        @Body() body: SignUpData,
        @Res({ passthrough: true }) res: Response
    ) {
        const user = await this.authService.signUp(body);
        const accessToken = getVerifyToken(user.id, user.name);
        const refreshToken = await this.authService.updateRefreshToken(user);
        await this.authService.setCookieTokens(accessToken, refreshToken, res);
        return { user };
    }

    @Post('signIn')
    async signIn(
        @Body() body: SignInData,
        @Res({ passthrough: true }) res: Response
    ) {
        const user = await this.authService.signIn(body);
        const accessToken = getVerifyToken(user.id, user.name);
        const refreshToken = await this.authService.updateRefreshToken(user);
        await this.authService.setCookieTokens(accessToken, refreshToken, res);
        return { user };
    }

    @UseGuards(AuthGuard)
    @Get('me')
    async me(
        @User() user: UserPayload
    ) {
        return this.authService.me(user.id);
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) res: Response) {
        this.authService.logout(res);
        return { message: "ok" };
    }
}