import styles from "../styles/table.module.scss";
import type { TBodyProps } from "../config/config";

export const TBody = ({ children, className, ...rest }: TBodyProps) => {


    return (
        <tbody {...rest} className={className || styles.tbody}>
            {children}
        </tbody>
    )
}