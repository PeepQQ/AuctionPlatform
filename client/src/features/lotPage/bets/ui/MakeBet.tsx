'use client'
import { useState } from "react";
import styles from "../styles/makeBet.module.scss";
import { Button } from "@/shared/ui/button";
import { useMakeBetMutation } from "@/shared/api/bet/bet.api";


export const MakeBet = ({
    lotId
}: { lotId: number}) => {
    const [betSumm, setBetSumm] = useState(0);
    const [makeBet, { isLoading }] = useMakeBetMutation();

    return (
        <div className={styles.makeBetWrapper}>
            <Button
                variant="secondary"
                size="default"
                onClick={() => makeBet({lotId, summ: betSumm})}
            >
                Сделать ставку
            </Button>
            <input 
                onChange={(e) => setBetSumm(Number(e.currentTarget.value))}
                type="text"
                placeholder="bet"
            />
        </div>
    )
}