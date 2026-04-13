import styles from "../styles/table.module.scss";
import type { TableProps } from "../config/config";

export const Table = ({ children, className, ...rest }: TableProps) => {


    return (
        <table {...rest} className={className || styles.table}>
            {children}
        </table>
    )
}