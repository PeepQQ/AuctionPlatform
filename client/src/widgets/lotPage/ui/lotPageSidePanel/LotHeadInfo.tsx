import styles from "../../styles/lotPageSidePanel.module.scss"
import type { Lot } from "@/entities/lot"





export const LotHeadInfo = ({
    lot
}: { lot: Lot }) => {



    return (
        <div className={styles.lotHeadInfo}>
            <h1 className={styles.lotName}>{lot.name}</h1>
            <div className={""}>

            </div>
        </div>
    )
}