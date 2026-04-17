import type { Bet, GetBetsData, BetsResData } from "@/entities/bet";
import axios from "axios";

export interface betsTableCol {
    id: number;
    text: string;
    dataKey: keyof Bet;
    parseFn?: (text:string) => string;
}


export const betsTableCols: betsTableCol[] = [
    {
        id: 1,
        text: 'Id ставки',
        dataKey: 'id'
    },
    {
        id: 2,
        text: 'Пользователь',
        dataKey: 'username'
    },
    {
        id: 3,
        text: 'Сумма',
        dataKey: 'summ',
        parseFn: (summ) => summ + ' ' + '$'
    },
    {
        id: 4,
        text: 'Дата',
        dataKey: 'date',
        parseFn: (date) => new Date(date).toLocaleString()
    }
]

export const fetchBets = async ({
    lotId,
    page,
    pageSize,
    onSuccess
}: GetBetsData & {onSuccess: (data: BetsResData) => void}) => {
    const res = await axios.post("/api/bet/getLotBets", {
        lotId,
        page,
        pageSize
    })
    onSuccess(res.data as BetsResData);
};