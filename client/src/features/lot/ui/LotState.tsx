'use client'
import { useState, useEffect } from "react";
import { LotStates, LotStateLabels } from "@/entities/lot";
import { useLotSocket } from "@/shared/lib/hooks";


export interface LotStateProps {
    lotId: number;
    className?: string;
    initialState: LotStates
}

export const LotState = ({
    lotId,
    className,
    initialState
}: LotStateProps) => {
    const [currentState, setCurrentState] = useState<LotStates>(initialState);
    const { onState } = useLotSocket(lotId);
    
    useEffect(() => {
        const unsubscribe = onState(({state}) => {
          setCurrentState(state);
        });
      
        return unsubscribe;
    }, [onState]);

    return (
        <span className={className}>{LotStateLabels[currentState]}</span>
    )
}