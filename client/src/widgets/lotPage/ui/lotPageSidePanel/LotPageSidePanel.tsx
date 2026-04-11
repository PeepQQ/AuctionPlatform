import styles from "../../styles/lotPageSidePanel.module.scss";
import { LotHeadInfo } from "./LotHeadInfo";
import type { Lot } from "@/entities/lot";
import { MakeBet } from "@/features/lotPage";
import { BetsList } from "@/features/lotPage/bets/ui/BetsList";


export const LotPageSidePanel = ({
    lot
}: { lot: Lot }) => {


    return (
        <div className={styles.lotPageSidePanel}>
            <LotHeadInfo lot={lot} />
            <MakeBet 
                lotId={lot.id}
            />
        </div>
    )
}