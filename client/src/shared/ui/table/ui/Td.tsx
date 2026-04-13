import styles from "../styles/table.module.scss";
import type { TdProps } from "../config/config";

export const Td = ({ children, className, ...rest }: TdProps) => {


    return (
        <td {...rest} className={className || styles.td}>
            {children}
        </td>
    )
}