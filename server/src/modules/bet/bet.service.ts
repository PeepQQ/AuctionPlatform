import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { LotGateway } from "../lot/lot.gateway";
import type { MakeBetData } from "./types/bet.types";


@Injectable()
export class BetService {
  constructor(
    private readonly prisma: PrismaService, 
    private readonly lotGateway: LotGateway
  ) {}

  async makeBet({
    lotId,
    userId,
    username,
    summ
  }: MakeBetData) {
    await this.prisma.lotBet.create({
        data: {
            userId,
            lotId,
            summ,
            username
        }
    })

    const bets = await this.getBets(lotId);

    this.lotGateway.lotBets(lotId.toString(), bets);
  }

  async getBets(lotId: number) {
    return this.prisma.lotBet.findMany({
      where: { lotId },
      orderBy: {
        date: 'desc',
      },
    });
  }
}