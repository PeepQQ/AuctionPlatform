

export interface MakeBetData {
  lotId: number;
  userId: number;
  summ: number;
  username: string;
}

export interface Bet {
  lotId: number;
  userId: number;
  summ: number;
  date: Date;
}