import { User } from "@prisma/client";
import * as jwt from 'jsonwebtoken';
import type { JwtPayload } from "jsonwebtoken";

export interface AppAccessPayload extends JwtPayload {
    id: number;
    email: string;
    exp: number;
  }

export function formatUser(user: User) {
    const { passwordHash, refreshToken, ...formattedUser } = user;
    return formattedUser;
}

function getJwtSecret(): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    return secret;
}

export function getVerifyToken (id: number, email: string) {
    return jwt.sign({ id, email }, getJwtSecret(), { expiresIn: '15m' });
}

export function getRefreshToken (id: number, email: string) {
    return jwt.sign({ id, email }, getJwtSecret(), { expiresIn: '15d' });
}

export function verifyToken(token: string) {
    return jwt.verify(token, getJwtSecret()) as AppAccessPayload;
}