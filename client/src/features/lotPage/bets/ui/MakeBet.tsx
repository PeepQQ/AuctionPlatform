'use client';
import styles from "../styles/makeBet.module.scss";
import { Button } from "@/shared/ui/button";
import { Modal, useModal } from "@/shared/ui/modal";
import { MakeBetForm } from "./MakeBetForm";


export const MakeBet = ({
    lotId
}: { lotId: number}) => {
    const { isOpen, closeModal, openModal } = useModal();

    return (
        <div className={styles.makeBetWrapper}>
            <Button
                variant="secondary"
                size="default"
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
        </div>
    )
}