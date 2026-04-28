'use client';
import { Lot, LotStates } from "@/entities/lot"
import { Timer } from "@/shared/ui/timer"
import { syncLot } from "../config/config";


interface LotTimerProps {
    lot: Lot,
}

export const LotTimer = ({
    lot
}: LotTimerProps) => {
    const isWaitingState = lot.state === LotStates.WAITING;

    return (
        <>
            <h4>{isWaitingState ? 'До начала' : 'До окончания'}:</h4>
            <Timer 
                expiryTimestamp={
                    isWaitingState ? lot.startAt : lot.endAt
                } 
                expireHandler={() => {syncLot(lot.id)}}
            />
        </>
    ) 
}