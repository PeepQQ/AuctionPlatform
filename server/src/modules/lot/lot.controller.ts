import { Controller, Get, Post, Body, Headers, UnauthorizedException, UseInterceptors } from '@nestjs/common';
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

  @Get('get')
  async getLots() {
    return this.lotService.getLots();
  }
}
