'use client';
import { getCookieWithExpirationCheck, setCookie } from "../hooks/coockie";
import { useRefreshTokenMutation, useGetUserQuery } from "@/shared/api/user/user.api";
import { useEffect } from "react";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const accessToken = getCookieWithExpirationCheck('accessToken');
    const refreshToken = getCookieWithExpirationCheck('refreshToken');

    const [ refresh, {data} ] = useRefreshTokenMutation();

    useEffect(() => {
        if (!accessToken && refreshToken) refresh(null);
    }, [accessToken, refreshToken])

    return (
        children
    )
}