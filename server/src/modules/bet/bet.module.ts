import { Module } from '@nestjs/common';
import { BetController } from './bet.controller';
import { BetService } from './bet.service';
import { AuthModule } from '../auth/auth.module';
import { LotModule } from '../lot/lot.module';

@Module({
  imports: [AuthModule, LotModule],
  controllers: [BetController],
  providers: [BetService],
})

export class BetModule {}
