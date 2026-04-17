import styles from "../../styles/lotPageContent.module.scss";
import { BetsListTable } from "@/features/lot/bets/ui/BetsListTable";






export const LotPageContent = ({
    lotId
}: { lotId: number}) => {



    return (
        <div className={styles.lotPageContent}>
            <div className={styles.betsList}>
                <h2 className={styles.groupTitle}>Ставки</h2>
                <BetsListTable lotId={lotId} />
            </div>
        </div>
    )
}