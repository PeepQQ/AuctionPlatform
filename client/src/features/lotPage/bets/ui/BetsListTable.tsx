'use client'
import { socket } from "@/shared/lib/hooks";
import { useEffect, useState, useRef } from "react";
import { betsListTHead, fetchBets } from "../config/config";
import type { Bet, BetsResData } from "@/entities/bet";
import { renderTableTd } from "../lib/renderTableTd";
import {
    Table,
    TBody,
    THead,
    Tr,
    Th,
    TablePaginate
} from "@/shared/ui/table";


export const BetsListTable = ({ lotId }: { lotId: number }) => {
    const [isNewBet, setIsNewBet] = useState(false);
    const [paginateData, setPaginateData] = useState({
        lotId: lotId,
        page: 1,
        pageSize: 8,
    })
    const [totalCount, setTotalCount] = useState(0);
    const [bets, setBets] = useState<Bet[] | []>([]);
    const paginateRef = useRef(paginateData);

    const onSuccessFetchBets = (data: BetsResData) => {
        setBets(data.bets);
        setTotalCount(data.totalCount);
    }

    const updatePage = (page: number) => {
        setPaginateData(prev => {
            const next = { ...prev, page };
            paginateRef.current = next;
        
            fetchBets({
                ...next,
                onSuccess: onSuccessFetchBets
            });
        
            return next;
        });
        if (page === 1) setIsNewBet(false);
    }

    const newBetHandler = ({ lotId: incomingLotId, bet, totalCount }: { lotId: number, bet: Bet, totalCount: number }) => {
        if (incomingLotId != lotId) return;

        const { page, pageSize } = paginateRef.current;        
        
        if (page == 1) {
            setBets(prev => {
                const next = [bet, ...prev];
                return next.length > pageSize
                    ? next.slice(0, -1)
                    : next;
            });
        } else {
            setIsNewBet(true);
        }
        setTotalCount(totalCount);
    };

    useEffect(() => {
        paginateRef.current = paginateData;
    }, [paginateData]);

    useEffect(() => {
        updatePage(1);
        const roomId = lotId.toString();
        socket.emit('joinLot', roomId);
        socket.on('newBet', newBetHandler);
        return () => {
            socket.emit('leaveLot', roomId);
            socket.off('newBet', newBetHandler);
        };
    }, [lotId]);

    return (
        <>
            {isNewBet && <p>Появились новые ставки, перейдите на первую страницу чтобы увидеть их.</p>}
            <Table>
                <THead>
                    <Tr>
                        {betsListTHead.map(item =>
                            <Th key={item.id}>
                                {item.text}
                            </Th>
                        )}
                    </Tr>
                </THead>
                <TBody>
                    {bets.map(bet =>
                        <Tr key={bet.id}>
                            {betsListTHead.map(item =>
                                renderTableTd({ item, bet })
                            )}
                        </Tr>
                    )}
                </TBody>
            </Table>

            <TablePaginate 
                pageSize={paginateData.pageSize}
                totalCount={totalCount}
                activePage={paginateData.page}
                onSelectPage={(page) => updatePage(page)}
            />
        </>
    )
}