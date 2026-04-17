



export interface Lot {
    id: number;
    name: string;
    description: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    startAt: Date;
    pictures: LotPicture[];
    ownerId: number;
    state: LotStates;
}

export type LotPicture = {
    path: string;
}

export interface CreateLotData {
    name: string;
    description: string;
    price: number;
    startAt: Date;
}

export enum LotStates {
    WAITING,
    TRADING,
    FINISHED
}

export const LotStateLabels: Record<string, string> = {
    WAITING: 'Ожидание торгов',
    TRADING: 'Идёт торг',
    FINISHED: 'Завершен',
};