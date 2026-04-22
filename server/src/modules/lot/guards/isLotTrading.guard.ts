import {
    CanActivate,
    ExecutionContext,
    Injectable,
    BadRequestException,
  } from '@nestjs/common';
import { Request } from 'express';
import { LotService } from '../lot.service';
import { LotState } from '@prisma/client';
  
@Injectable()
export class isLotTrading implements CanActivate {
    constructor(private lotService: LotService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const req = context.switchToHttp().getRequest<Request>();

      const { lotId } = req.query;
      const lot = await this.lotService.getLotById(Number(lotId));
      if(lot?.state !== LotState.TRADING) {
        throw new BadRequestException();
      }

      return true;
    }
}