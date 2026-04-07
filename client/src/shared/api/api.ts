import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { getCookieWithExpirationCheck } from "@shared/lib/hooks";

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['user'],
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/",
        prepareHeaders: (headers) => {
            const accessToken = getCookieWithExpirationCheck('accessToken');
            if (accessToken) {
                headers.set('accesstoken', accessToken);
            }
            
            const refreshToken = getCookieWithExpirationCheck('refreshToken');
            if (refreshToken) {
                headers.set('refreshtoken', refreshToken);
            }
            
            return headers;
        },
    }),
    endpoints: builder => ({
        test: builder.query({
            query: () => '/',
        }),
    }) 
})

export const { useTestQuery } = api;