import { Controller, Get, Post, Body, UseInterceptors, UseGuards } from '@nestjs/common';
import { LotService } from './lot.service';
import type { CreateLotData, MulterFile } from './types/lot.types';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadedFiles } from '@nestjs/common';
import { User } from '../../decorators/user.decorator';
import type { UserPayload } from 'src/helpers/helpers';
import { AuthGuard } from '../auth/guards/auth.guard';
import { isLotExists } from './guards/isLotExists.guard';
import { Lot } from 'src/decorators/lot.decorator';
import type { Lot as LotType } from '@prisma/client';

@Controller('lots')
export class LotController {
  constructor(
    private readonly lotService: LotService,
  ) {}

  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('pictures', 10))
  @Post('create')
  async createLot(
    @UploadedFiles() pictures: MulterFile[],
    @Body() body: CreateLotData,
    @User() user: UserPayload,
  ) {
    return this.lotService.createLot({ ...body, pictures }, user.id);
  }

  @Get('getLots')
  async getLots() {
    return this.lotService.getLots();
  }

  @UseGuards(isLotExists)
  @Get('getLotById')
  async getLotById(
    @Lot() lot: LotType
  ) {
    const pictures = await this.lotService.getLotPictures(lot.id);
    return {...lot, pictures};
  }
}
