import styles from "../styles/table.module.scss";
import type { ThProps } from "../config/config";

export const Th = ({ children, className, ...rest }: ThProps) => {


    return (
        <th {...rest} className={className || styles.th}>
            {children}
        </th>
    )
}