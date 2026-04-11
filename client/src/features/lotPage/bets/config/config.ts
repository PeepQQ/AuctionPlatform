import type { Bet } from "@/entities/bet"

export interface betsListTHeadItem {
    id: number;
    text: string;
    dataKey: keyof Bet;
    parseFn?: (text:string) => string;
}


export const betsListTHead: betsListTHeadItem[] = [
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

export const fetchBets = async (
    lotId: number, 
    onSuccess: (data: Bet[]) => void
) => {
    const res = await fetch(`/api/bet/getBetsByLotId?lotId=${lotId}`);
    const data = await res.json();
    onSuccess(data);
};