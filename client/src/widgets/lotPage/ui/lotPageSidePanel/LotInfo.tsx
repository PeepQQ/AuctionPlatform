'use client';
import { Lot } from "@/entities/lot"
import styles from "../../styles/lotPageSidePanel.module.scss";
import { LotState } from "@/features/lot/ui/LotState";



export const LotInfo = ({
    lot
}: {lot: Lot}) => {

    return (
        <div className={styles.lotInfo}>
            <div className={styles.lotInfoRow}>
                <h4 className={styles.lotInfoRowName}>Статус:</h4>
                <LotState 
                    lotId={lot.id}
                    className={styles.lotInfoRowValue}
                    initialState={lot.state}
                />
            </div>
            <div className={styles.lotInfoRow}>
                <h4 className={styles.lotInfoRowName}>Дата начала:</h4>
                <span className={styles.lotInfoRowValue}>{new Date(lot.startAt).toLocaleString('ru-RU')}</span>
            </div>
        </div>
    )
}