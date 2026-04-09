



export interface Lot {
    id: number;
    name: string;
    description: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    startAt: Date;
}

export interface CreateLotData {
    name: string;
    description: string;
    price: number;
    startAt: Date;
}