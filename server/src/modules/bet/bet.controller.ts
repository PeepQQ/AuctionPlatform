import { Controller, Post, Body, Headers, UnauthorizedException, Get, Query } from "@nestjs/common";
import { BetService } from "./bet.service";
import type { MakeBetData, GetBetsData } from "./types/bet.types";
import { AuthService } from "../auth/auth.service";




@Controller('bet')
export class BetController {
    constructor(
        private readonly authService: AuthService,
        private readonly betService: BetService
    ) {}

    @Post('makeBet')
    async makeBet(
        @Body() data: MakeBetData,
        @Headers() headers: Headers,
    ) {
        const { id: userId, name: username } = await this.authService.me(headers);
        if (!userId) {
            throw new UnauthorizedException('User not found');
        }
        return this.betService.makeBet({
            lotId: data.lotId, 
            userId, 
            username,
            summ: data.summ,
        });
    }

    @Post('getLotBets')
    async getLotBets(
        @Body() data: GetBetsData
    ) {
        return this.betService.getBets(data);
    }
}