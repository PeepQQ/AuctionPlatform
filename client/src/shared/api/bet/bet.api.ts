import { api } from "../api"
import { MakeBetData, Bet } from "@/entities/bet";




export const betApi = api.injectEndpoints({
    endpoints: (builder) => ({
        makeBet: builder.mutation<Bet, MakeBetData>({
            query: (data) => ({
                url: '/bet/makeBet',
                method: 'POST',
                body: data
            })
        })
    })
})

export const { 
    useMakeBetMutation
} = betApi;