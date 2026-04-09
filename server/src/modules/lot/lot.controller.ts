import { Controller, Get, Post, Body, Headers, UnauthorizedException, NotFoundException, UseInterceptors, Query } from '@nestjs/common';
import { LotService } from './lot.service';
import { AuthService } from '../auth/auth.service';
import type { CreateLotData, MulterFile } from './types/lot.types';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadedFiles } from '@nestjs/common';

@Controller('lots')
export class LotController {
  constructor(
    private readonly lotService: LotService, 
    private readonly authService: AuthService
  ) {}

  @UseInterceptors(FilesInterceptor('pictures', 10))
  @Post('create')
  async createLot(
    @UploadedFiles() pictures: MulterFile[],
    @Body() body: CreateLotData,
    @Headers() headers: Headers,
  ) {
    const { id: userId } = await this.authService.me(headers);
    if (!userId) {
      throw new UnauthorizedException('User not found');
    }
    return this.lotService.createLot({ ...body, pictures }, userId);
  }

  @Get('getLots')
  async getLots() {
    return this.lotService.getLots();
  }

  @Get('getLotById')
  async getLotById(@Query('lotId') lotId: string) {
    if (!lotId) {
      throw new NotFoundException('Не передан lotId')
    }
    const lot = await this.lotService.getLotById(lotId);
    if (!lot) {
      throw new NotFoundException('Лот не найден')
    }
    
    const pictures = await this.lotService.getLotPictures(lotId);

    return {...lot, pictures};
  }
}
