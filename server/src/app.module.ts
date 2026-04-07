import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module.js';
import { UserModule } from './modules/user/user.module.js';
import { AuthModule } from './modules/auth/auth.module';
import { LotModule } from './modules/lot/lot.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, LotModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
