'use client'
import { useEffect } from "react";



export interface LotPriceProps {
    lotId: string;
    className: string;
}

export const LotPrice = ({
    lotId,
    className
}: LotPriceProps) => {

    // useEffect(() => {
    //     socket.emit('joinLot', lotId);
      
    //     socket.on('lotPrice', (price) => {
    //       console.log('New price:', price);
    //     });
      
    //     return () => {
    //       socket.off('lotPrice');
    //     };
    // }, [lotId]);

    return (
        <></>
    )
}