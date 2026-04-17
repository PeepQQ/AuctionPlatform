'use client'
import { useEffect, useState } from "react";
import { useLotSocket } from "@/shared/lib/hooks";


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
    const { onPrice } = useLotSocket(lotId);

    useEffect(() => {
        const unsubscribe = onPrice(({price}) => {
            setCurrentLotPice(price);
        })

        return unsubscribe;
    }, [lotId]);

    return (
        <span className={className}>{currentLotPrice} $</span>
    )
}