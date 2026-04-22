import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LotService } from '../lot.service';

@Injectable()
export class isLotExists implements CanActivate {
  constructor(private readonly lotService: LotService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const lotId = Number(req.query.lotId || req.body.lotId);

    if (!lotId) {
      throw new NotFoundException('Lot ID не передан');
    }

    const lot = await this.lotService.getLotById(lotId);

    if (!lot) {
      throw new NotFoundException('Лот не найден');
    }

    req.lot = lot;

    return true;
  }
}