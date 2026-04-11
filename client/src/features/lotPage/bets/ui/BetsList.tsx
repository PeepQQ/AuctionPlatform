'use client'
import { socket } from "@/shared/lib/hooks";
import { useEffect, useState } from "react";
import styles from "../styles/betsList.module.scss";
import { betsListTHead, fetchBets } from "../config/config";
import type { Bet } from "@/entities/bet";
import { renderTableTd } from "../lib/renderTableTd";


export const BetsList = ({ lotId }: { lotId: number }) => {
    const [bets, setBets] = useState<Bet[] | null>(null);

    useEffect(() => {
        fetchBets(lotId, (data) => setBets(data));

        const roomId = lotId.toString();
        socket.emit('joinLot', roomId);
    
        const handler = ({ lotId: incomingLotId, bets }: { lotId: number, bets: Bet[] }) => {
            if (incomingLotId != lotId) return;
            setBets(bets);
        };
        socket.on('lotBets', handler);
    
        return () => {
            socket.emit('leaveLot', roomId);
            socket.off('lotBets', handler);
        };
    }, [lotId]);

    return (
        <table className={styles.betsListTable}>
            <thead className={styles.betsListTHead}>
                <tr>
                    {betsListTHead.map(item =>
                        <th key={item.id} className={styles.betsListTh}>
                            {item.text}
                        </th>
                    )}
                </tr>
            </thead>
            <tbody className={styles.betsListTBody}>
                {bets?.length && bets.map(bet =>
                    <tr key={bet.id}>
                        {betsListTHead.map(item =>
                            renderTableTd({ item, bet, className: styles.betsListTd})
                        )}
                    </tr>
                )}
            </tbody>
        </table>
    )
}