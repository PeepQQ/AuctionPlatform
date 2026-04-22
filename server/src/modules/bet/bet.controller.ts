import { Controller, Post, Body, Headers, UnauthorizedException, Get, Query, UseGuards } from "@nestjs/common";
import { BetService } from "./bet.service";
import type { MakeBetData, GetBetsData } from "./types/bet.types";
import { AuthService } from "../auth/auth.service";
import type { UserPayload } from "src/helpers/helpers";
import { User } from "../../decorators/user.decorator";
import { AuthGuard } from "../auth/guards/auth.guard";

@Controller('bet')
export class BetController {
    constructor(
        private readonly betService: BetService
    ) {}

    @UseGuards(AuthGuard)
    @Post('makeBet')
    async makeBet(
        @Body() data: MakeBetData,
        @User() user: UserPayload,
    ) {
        const userId = user.id;
        if (!userId) {
            throw new UnauthorizedException('User not found');
        }
        return this.betService.makeBet({
            lotId: data.lotId, 
            userId: user.id, 
            username: user.name,
            summ: data.summ,
        });
    }

    @Post('getLotBets')
    async getLotBets(
        @Body() data: GetBetsData
    ) {
        return this.betService.getBets(data);
    }

    @UseGuards(AuthGuard)
    @Post('canMakeBet')
    async canMakeBet(
        @Body() data: {lotId: number},
        @User() user: UserPayload,
    ) {
        return this.betService.canMakeBet(data.lotId, user.id);
    }
}