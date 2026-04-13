import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { LotGateway } from "../lot/lot.gateway";
import type { GetBetsData, MakeBetData } from "./types/bet.types";
import { LotService } from "../lot/lot.service";


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
    const lot = await this.prisma.lot.findUnique({
      where: {
        id: lotId
      }
    })
    if (!lot) {
      throw new BadRequestException('Лот не найден');
    }
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
}