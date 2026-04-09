import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import type { CreateLotData } from './types/lot.types.js';
import { AuthService } from '../auth/auth.service.js';
import { ImageKit, toFile } from '@imagekit/nodejs';


@Injectable()
export class LotService {
  constructor(
    private readonly prisma: PrismaService, 
    private readonly authService: AuthService
  ) {}

  async createLot(data: CreateLotData, userId: number) {
    const imageKit = new ImageKit({ 
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY
    });
    
    const lot = await this.prisma.lot.create({
      data: {
        name: data.name,
        description: data.description,
        price: Number(data.price),
        ownerId: userId,
        startAt: new Date(data.startAt)
      },
    });

    await Promise.all(data.pictures.map(async (picture) => {
      const fileName = `${lot.id}-${picture.originalname}`;
      const res = await imageKit.files.upload({
        file: await toFile(picture.buffer, picture.originalname),
        fileName: fileName,
        folder: 'lots',
        tags: ['lot', lot.id.toString()]
      });

      await this.prisma.lotPicture.create({
        data: {
          path: res.filePath || fileName,
          lotId: lot.id
        }
      });
    }));

    return lot;
  }

  async getLots() {
    return this.prisma.lot.findMany();
  }

  async getLotPictures(lotId: string) {
    return this.prisma.lotPicture.findMany({
      where: {
        lotId: Number(lotId)
      },
      select: { path: true }
    })
  }

  async getLotById(lotId: string) {
    return this.prisma.lot.findFirst({
      where: {
        id: Number(lotId)
      }
    })
  }
}