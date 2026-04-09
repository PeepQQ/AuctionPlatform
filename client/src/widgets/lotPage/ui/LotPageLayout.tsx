import styles from "../styles/lotPageLayout.module.scss";


interface LotPageLayoutProps {
    pictures: React.ReactNode;
    sidePanel: React.ReactNode;
    children: React.ReactNode;
}

export const LotPageLayout = ({
    pictures,
    sidePanel,
    children
}: LotPageLayoutProps) => {




    return (
        <div className={`${styles.lotPageLayout} container`}>
            <div className={styles.lotPageHead}>
                <div className={styles.lotPagePictures}>
                    {pictures}
                </div>
                <div className={styles.lotPageSidePanel}>
                    {sidePanel}
                </div>
            </div>
            <div className={styles.lotPageContent}>
                {children}
            </div>
        </div>
    )
}