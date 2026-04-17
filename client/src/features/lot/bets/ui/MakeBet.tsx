'use client';
import { useEffect, useState } from "react";
import { socket } from "@/shared/lib/hooks";
import styles from "../styles/makeBet.module.scss";
import { Button } from "@/shared/ui/button";
import { Modal, useModal } from "@/shared/ui/modal";
import { MakeBetForm } from "./MakeBetForm";


export const MakeBet = ({
    lotId,
    ownerId
}: { lotId: number; ownerId: number}) => {
    const { isOpen, closeModal, openModal } = useModal();
    const [isCanMakeBet, setIsCanMakeBet] = useState(false);

    const firstCheck = async () => {
        try {
            await axios.post('/bet/canMakeBet', {
                lotId: lotId
            }, {
                withCredentials: true
            })
            setIsCanMakeBet(true);
        }catch(err) {
            setIsCanMakeBet(false);
        }
    }

    useEffect(() => {
        firstCheck();
        socket.emit('joinLot', lotId);

        const handler = (data: { lotId: number; isCan: boolean }) => {
            if (Number(data.lotId) !== lotId) return;
            setIsCanMakeBet(data.isCan);
        };

        socket.on('canMakeBet', handler);

        return () => {
            socket.off('canMakeBet', handler);
        };
    }, [lotId]);

    if (!isCanMakeBet) return null;

    return (
        <>
            <Button
                variant="secondary"
                size="default"
                fullWidth
                onClick={openModal}
            >
                Сделать ставку
            </Button>

            <Modal
                isOpen={isOpen}
                closeModal={closeModal}
                title="Введите сумму"
            >
                <MakeBetForm 
                    lotId={lotId}
                    onSuccessBet={closeModal}
                />
            </Modal>
        </>
    )
}