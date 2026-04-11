import { Module } from '@nestjs/common';
import { LotController } from './lot.controller';
import { LotService } from './lot.service';
import { AuthModule } from '../auth/auth.module';
import { LotGateway } from './lot.gateway';

@Module({
  imports: [AuthModule],
  controllers: [LotController],
  providers: [LotService, LotGateway],
  exports: [LotGateway]
})

export class LotModule {}
