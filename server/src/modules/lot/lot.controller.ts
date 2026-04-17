import { Controller, Get, Post, Body, Headers, UnauthorizedException, NotFoundException, UseInterceptors, Query, UseGuards } from '@nestjs/common';
import { LotService } from './lot.service';
import { AuthService } from '../auth/auth.service';
import type { CreateLotData, MulterFile } from './types/lot.types';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadedFiles } from '@nestjs/common';
import { LotState } from '@prisma/client';
import { User } from '../auth/user.decorator';
import type { UserPayload } from 'src/helpers/helpers';
import { AuthGuard } from '../auth/auth.guard';

@Controller('lots')
export class LotController {
  constructor(
    private readonly lotService: LotService, 
    private readonly authService: AuthService
  ) {}

  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('pictures', 10))
  @Post('create')
  async createLot(
    @UploadedFiles() pictures: MulterFile[],
    @Body() body: CreateLotData,
    @User() user: UserPayload,
  ) {
    const userId = user.id;
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
    const lot = await this.lotService.getLotById(Number(lotId));
    if (!lot) {
      throw new NotFoundException('Лот не найден')
    }
    
    const pictures = await this.lotService.getLotPictures(Number(lotId));

    return {...lot, pictures};
  }

  @Post('changeLotState')
  async changeLotState(@Body() body: {lotId:number, state:LotState}) {
    return this.lotService.changeLotState(body.lotId, body.state);
  }
}
