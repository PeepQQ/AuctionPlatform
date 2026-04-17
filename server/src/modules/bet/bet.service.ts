import { Injectable, BadRequestException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { LotGateway } from "../lot/lot.gateway";
import type { GetBetsData, MakeBetData } from "./types/bet.types";
import { LotService } from "../lot/lot.service";
import { LotState } from "@prisma/client";


@Injectable()
export class BetService {
  constructor(
    private readonly prisma: PrismaService, 
    private readonly lotGateway: LotGateway,
    private readonly lotService: LotService
  ) {}

  async makeBet({
    lotId,
    userId,
    username,
    summ
  }: MakeBetData) {
    const lot = await this.canMakeBet(lotId, userId);

    const minBetSumm = lot?.price;
    if(summ < minBetSumm) {
      throw new BadRequestException(`Ставка должна быть больше ${minBetSumm} $`);
    }

    const newBet = await this.prisma.lotBet.create({
        data: {
            userId,
            lotId,
            summ,
            username
        }
    })
    const totalCount = await this.prisma.lotBet.count({
      where: { lotId }
    })

    this.lotService.changeLotPrice(lotId, summ);
    this.lotGateway.newBet(lotId.toString(), newBet, totalCount);
  }

  async getBets({ lotId, page, pageSize }: GetBetsData) {
    const bets = await this.prisma.lotBet.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: { lotId },
      orderBy: {
        date: 'desc',
      },
    });

    const totalCount = await this.prisma.lotBet.count({
      where: { lotId }
    })

    return {
      bets,
      totalCount
    }
  }

  async canMakeBet(lotId: number, userId: number) {
    if(!userId) {
      throw new UnauthorizedException('Пользователь не авторизован');
    }

    const lot = await this.lotService.getLotById(lotId);
    if(!lot) {
      throw new BadRequestException('Лот не найден');
    }

    if(lot.state !== LotState.TRADING) {
      throw new BadRequestException('Совершить ставку возможно только при статусе лота [Идет торг]');
    }

    const lastBet = await this.getLastBet(lotId);

    if(lastBet?.userId === userId) {
      throw new BadRequestException('Вы уже совершали ставку на данный лот и она является последней, дождитесь пока её кто-нибудь перебьет.');
    }

    return lot;
  }

  async getLastBet(lotId: number) {
    return await this.prisma.lotBet.findFirst({
      where: {lotId},
      orderBy: {
        date: 'desc',
      },
    })
  }
}