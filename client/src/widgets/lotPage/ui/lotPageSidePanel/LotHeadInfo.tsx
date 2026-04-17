import styles from "../../styles/lotPageSidePanel.module.scss"
import type { Lot } from "@/entities/lot"
import { LotPrice } from "@/features/lot"




export const LotHeadInfo = ({
    lot
}: { lot: Lot }) => {



    return (
        <div className={styles.lotHeadInfo}>
            <h1 className={styles.lotName}>{lot.name}</h1>
            <div className={styles.lotPriceWrapper}>
                <h4>Цена лота:</h4>
                <LotPrice 
                    lotId={lot.id}
                    className={styles.lotPrice}
                    lotPrice={lot.price}
                />
            </div>
        </div>
    )
}