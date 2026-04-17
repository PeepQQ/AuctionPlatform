import { PrismaModule } from "src/prisma/prisma.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";


@Module({
    imports: [PrismaModule, UserModule],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}