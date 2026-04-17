'use client';
import { useLotRoom } from "../hooks";

export const LotSocketProvider = ({ 
    lotId, children 
}: {
    lotId: number;
    children: React.ReactNode
}) => {
    useLotRoom(lotId);

    return children;
};