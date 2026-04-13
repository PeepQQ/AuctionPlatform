import styles from "../styles/table.module.scss";
import type { TrProps } from "../config/config";

export const Tr = ({ children, className, ...rest }: TrProps) => {


    return (
        <tr {...rest} className={className || styles.tr}>
            {children}
        </tr>
    )
}