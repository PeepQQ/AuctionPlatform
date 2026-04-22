import { User } from "@prisma/client";
import * as jwt from 'jsonwebtoken';
import type { JwtPayload } from "jsonwebtoken";
import { ClientUser } from "src/modules/user/types/user.types";

export interface UserPayload extends JwtPayload {
    id: number;
    name: string;
    exp: number;
}

export function formatUser(user: User) {
    const { passwordHash, refreshToken, ...formattedUser } = user;
    return formattedUser as ClientUser;
}

function getJwtSecret(): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET в .env не найден');
    }
    return secret;
}

export function getVerifyToken (id: number, name: string) {
    return jwt.sign({ id, name }, getJwtSecret(), { expiresIn: '15m' });
}

export function getRefreshToken (id: number, name: string) {
    return jwt.sign({ id, name }, getJwtSecret(), { expiresIn: '15d' });
}

export function verifyToken(token: string) {
    return jwt.verify(token, getJwtSecret()) as UserPayload;
}