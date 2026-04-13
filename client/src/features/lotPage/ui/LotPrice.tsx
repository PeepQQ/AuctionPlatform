'use client'
import { useEffect, useState } from "react";
import { socket } from "@/shared/lib/hooks";


export interface LotPriceProps {
    lotId: number;
    className: string;
    lotPrice: number;
}

export const LotPrice = ({
    lotId,
    className,
    lotPrice
}: LotPriceProps) => {
    const [currentLotPrice, setCurrentLotPice] = useState(lotPrice);

    useEffect(() => {
        socket.emit('joinLot', lotId);

        const handler = (data: { lotId: number; price: number }) => {
            if (Number(data.lotId) !== lotId) return;
            setCurrentLotPice(data.price);
        };

        socket.on('lotPrice', handler);

        return () => {
            socket.off('lotPrice', handler);
        };
    }, [lotId]);

    return (
        <span className={className}>{currentLotPrice} $</span>
    )
}