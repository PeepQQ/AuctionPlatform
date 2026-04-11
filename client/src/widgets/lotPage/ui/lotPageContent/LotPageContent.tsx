import styles from "../../styles/lotPageContent.module.scss";
import { BetsList } from "@/features/lotPage/bets/ui/BetsList";






export const LotPageContent = ({
    lotId
}: { lotId: number}) => {



    return (
        <div className={styles.lotPageContent}>
            <div className={styles.betsList}>
                <h2 className={styles.groupTitle}>Ставки</h2>
                <BetsList lotId={lotId} />
            </div>
        </div>
    )
}