import { api } from "../api"
import { Lot, CreateLotData } from "@entities/lot"




export const lotApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createLot: builder.mutation<Lot, CreateLotData>({
            query: (data) => ({
                url: '/lots/create',
                method: 'POST',
                body: data
            })
        }),
        getLot: builder.query<Lot, {}>({
            query: (lotId: string) => `/lots/getLotById?lotId=${lotId}`
        })
    })
})

export const { 
    useCreateLotMutation,
    useGetLotQuery
} = lotApi;