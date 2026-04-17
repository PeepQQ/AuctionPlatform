import styles from "../../styles/lotPageSidePanel.module.scss";
import { LotHeadInfo } from "./LotHeadInfo";
import type { Lot } from "@/entities/lot";
import { MakeBet } from "@/features/lot";
import { LotInfo } from "./LotInfo";

export const LotPageSidePanel = ({
    lot
}: { lot: Lot }) => {

    return (
        <div className={styles.lotPageSidePanel}>
            <LotHeadInfo lot={lot} />
            <LotInfo lot={lot} />

            <div className={styles.makeBetWrapper}>
                <MakeBet 
                    lotId={lot.id}
                    ownerId={lot.ownerId}
                />
            </div>
        </div>
    )
}