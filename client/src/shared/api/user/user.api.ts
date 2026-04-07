import { api } from "../api"
import type { SignInData, SignUpData } from "@/entities/user";
import { setCookieMinutes, deleteCookie, setCookie } from "@shared/lib/hooks";

export const logout = () => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
};

export const userApi = api.injectEndpoints({
    endpoints: builder => ({
        getUser: builder.query({
            query: () => "/auth/me",
            providesTags: ['user'],
        }),
        refreshToken: builder.mutation({
            query: () => ({
                url: "/auth/refresh",
                method: "POST"
            }),
            transformResponse: (response: { accessToken: string; refreshToken: string }) => {
                setCookieMinutes('accessToken', response.accessToken, 15);
                setCookie('refreshToken', response.refreshToken, 15);
                return response;
            },
            invalidatesTags: ['user']
        }),
        signIn: builder.mutation({
            query: (data: SignInData) => ({
                url: "/auth/signIn",
                method: "POST",
                body: data,
            }),
            transformResponse: (response: { accessToken: string; refreshToken: string}) => {
                setCookieMinutes('accessToken', response.accessToken, 15);
                setCookie('refreshToken', response.refreshToken, 15);
                return response;
            },
            invalidatesTags: ['user'],
        }),
        signUp: builder.mutation({
            query: (data: SignUpData) => ({
                url: "/auth/signUp",
                method: "POST",
                body: data,
            }),
            transformResponse: (response: { accessToken: string; refreshToken: string; user: any }) => {
                setCookieMinutes('accessToken', response.accessToken, 15);
                setCookie('refreshToken', response.refreshToken, 15);
                return response;
            },
            invalidatesTags: ['user'],
        }),
    })
})


export const { 
    useGetUserQuery, 
    useRefreshTokenMutation, 
    useSignInMutation, 
    useSignUpMutation 
} = userApi;