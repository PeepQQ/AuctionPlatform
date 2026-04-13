import styles from "../styles/table.module.scss";
import type { TablePaginateProps } from "../config/config";
import clsx from "clsx";


export const TablePaginate = ({
    pageSize,
    totalCount,
    onSelectPage,
    activePage
}: TablePaginateProps) => {
    const pagesCount = Math.ceil(totalCount / pageSize);
    const pagesNums = Array.from({ length: pagesCount }, (_, i) => i+1);

    if (!pagesCount) return null;

    return (
        <div className={styles.paginate}>
            {pagesNums.map(page =>
                <div 
                    key={page} 
                    className={clsx(styles.paginatePage, activePage == page && styles.paginatePageActive)}
                    onClick={() => onSelectPage(page)}
                >
                    <span 
                        className={styles.paginatePageNum}
                    >{page}</span>
                </div>
            )}
        </div>
    )
}