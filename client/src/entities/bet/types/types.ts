



export interface MakeBetData {
    summ: number;
    lotId: number;
}

export interface Bet {
    id: number;
    lotId: number;
    userId: number;
    summ: number;
    username: string;
    date: string;
}