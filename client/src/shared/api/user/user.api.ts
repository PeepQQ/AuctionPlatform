import { api } from "../api"
import type { SignInData, SignUpData } from "@/entities/user";
import type { User } from "@/entities/user";
import Cookies from "js-cookie";

export const userApi = api.injectEndpoints({
    endpoints: builder => ({
        getUser: builder.query<User, void>({
            query: () => "/auth/me",
            providesTags: ['user'],
        }),
        refreshToken: builder.mutation({
            query: () => ({
                url: "/auth/refresh",
                method: "POST"
            }),
            invalidatesTags: ['user'],
        }),
        signIn: builder.mutation({
            query: (data: SignInData) => ({
                url: "/auth/signIn",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['user'],
        }),
        signUp: builder.mutation({
            query: (data: SignUpData) => ({
                url: "/auth/signUp",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['user'],
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST"
            }),
            invalidatesTags: ['user'],
        })
    })
})


export const { 
    useGetUserQuery, 
    useRefreshTokenMutation, 
    useSignInMutation, 
    useSignUpMutation,
    useLogoutMutation
} = userApi;