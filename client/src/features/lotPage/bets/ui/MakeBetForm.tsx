'use client';
import styles from "../styles/makeBet.module.scss";
import { useState, useEffect } from "react";
import { useMakeBetMutation } from "@/shared/api/bet/bet.api";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/form/input";


interface MakeBetFormProps {
    lotId: number;
    onSuccessBet: () => void;
}

export const MakeBetForm = ({
    lotId,
    onSuccessBet
}: MakeBetFormProps) => {
    const [betSumm, setBetSumm] = useState(0);
    const [makeBet, { isLoading, error }] = useMakeBetMutation();

    const handleMakeBet = async () => {
        try {
            await makeBet({
                summ: betSumm,
                lotId: lotId
            }).unwrap();
            onSuccessBet();
        }catch (err) {}
    }

    return (
        <div className={styles.makeBetForm}>
            <Input 
                onChange={(e) => setBetSumm(Number(e.currentTarget.value))}
                type="text"
                name="betSum"
                onlyNum
                placeholder="Сумма"
            />
            {error && <p>{(error as any)?.data?.message}</p>}
            <Button
                variant="secondary"
                size="default"
                loading={isLoading}
                onClick={handleMakeBet}
            >
                Подтвердить
            </Button>
        </div>
    )
}