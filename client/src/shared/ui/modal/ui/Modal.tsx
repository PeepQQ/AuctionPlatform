import styles from "../styles/modal.module.scss";
import clsx from "clsx";
import { DeleteIcon } from "@/assets/icons";


interface ModalProps {
    children: React.ReactNode;
    title: string;
    description?: string;
    closeModal: () => void;
    isOpen: boolean;
}

export const Modal = ({
    children,
    title,
    description,
    closeModal,
    isOpen
}: ModalProps) => {

    return (
        <div className={
            clsx(
                styles.modalWrapper, 
                isOpen && styles.modalOpen
            )
        }>
            <div className={styles.modal}>
                <div className={styles.modalClose}
                    onClick={closeModal}
                >
                    <DeleteIcon />
                </div>

                <div className={styles.modalHead}>
                    <h2 onClick={closeModal} className={styles.modalHeadTitle}>{title}</h2>
                    {description && <p className={styles.modalHeadDescription}>{description}</p>}
                </div>

                <div className={styles.modalContent}>
                    {children}
                </div>
            </div>
        </div>
    )
}