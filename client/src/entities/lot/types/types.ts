



export interface Lot {
    id: number;
    name: string;
    description: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    startAt: Date;
    pictures: LotPicture[]
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