import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['user', 'lot', 'bet'],
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/",
        credentials: 'include'
    }),
    endpoints: builder => ({
        test: builder.query({
            query: () => '/',
        }),
    }) 
})

export const { useTestQuery } = api;