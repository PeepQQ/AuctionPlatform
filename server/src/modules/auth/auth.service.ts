import { Injectable, UnauthorizedException } from "@nestjs/common";
import type { Response } from 'express';
import { PrismaService } from "src/prisma/prisma.service";
import { SignInData, SignUpData } from "./types/auth.types";
import * as bcrypt from 'bcrypt';
import { getVerifyToken, getRefreshToken, verifyToken, formatUser } from "../../helpers/helpers";
import { ClientUser } from "../user/types/user.types";


@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}

    async signUp({email, password, name}: SignUpData) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.create({
            data: {
                email,
                passwordHash: hashedPassword,
                name
            }
        })
        return formatUser(user)
    }

    async updateRefreshToken(user: ClientUser) {
        const refreshToken = getRefreshToken(user.id, user.email)
        await this.prisma.user.update({
            where: { id: user.id },
            data: { refreshToken }
        })
        return refreshToken
    }

    async setCookieTokens(accessToken: string, refreshToken: string, res: Response) {
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000,
            path: "/",
        });
        
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/",
        });
    }

    async logout(res: Response) {
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
        });
        
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
        });
    }

    async signIn({email, password}: SignInData) {
        const user = await this.prisma.user.findUnique({
            where: { email }
        })
        if (!user) {
            throw new UnauthorizedException('Пользователь не найден');
        }
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Неверный пароль');
        }
        return formatUser(user)
    }

    async me(userId: number) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId }
        })
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        return formatUser(user)
    }

    async refresh(refreshToken: string) {
        const { id } = verifyToken(refreshToken);
        
        const user = await this.prisma.user.findUnique({
            where: { id }
        })          
        if (!user || user.refreshToken !== refreshToken) {
            throw new UnauthorizedException();
        }
        const accessToken = getVerifyToken(user.id, user.email);
        const newRefreshToken = getRefreshToken(user.id, user.email);
        await this.prisma.user.update({
            where: { id },
            data: { refreshToken: newRefreshToken }
        })
        return { accessToken, refreshToken: newRefreshToken };
    }
}