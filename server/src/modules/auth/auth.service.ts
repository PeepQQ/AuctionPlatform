import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SignInData, SignUpData } from "./types/auth.types";
import * as bcrypt from 'bcrypt';
import { getVerifyToken, getRefreshToken, verifyToken, formatUser } from "../../helpers/helpers";


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
        const refreshToken = getRefreshToken(user.id, user.email);
        await this.prisma.user.update({
            where: { id: user.id },
            data: { refreshToken }
        })
        const accessToken = getVerifyToken(user.id, user.email);
        return {
            user: formatUser(user),
            accessToken,
            refreshToken
        };
    }

    async signIn({email, password}: SignInData) {
        const user = await this.prisma.user.findUnique({
            where: { email }
        })
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const refreshToken = getRefreshToken(user.id, user.email);
        const accessToken = getVerifyToken(user.id, user.email);
        this.prisma.user.update({
            where: { id: user.id },
            data: { refreshToken }
        })
        return {
            user: formatUser(user),
            accessToken,
            refreshToken
        };
    }

    async me(headers: Headers) {
        const accessToken = headers['accesstoken'];
        if(!accessToken) {
            throw new UnauthorizedException('Access token not found');
        }
        if (accessToken.exp < Date.now()) {
            throw new UnauthorizedException('Access token expired');
        }

        const { id } = verifyToken(accessToken);
        const user = await this.prisma.user.findUnique({
            where: { id }
        })
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        return formatUser(user);
    }

    async refresh(headers: Headers) {
        const refreshToken = headers['refreshtoken'];
        if(!refreshToken) {
            throw new UnauthorizedException('Refresh token not found');
        }
        const { id } = verifyToken(refreshToken);
        const user = await this.prisma.user.findUnique({
            where: { id }
        })
        if (!user) {
            throw new UnauthorizedException('User not found');
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