import styles from "../styles/table.module.scss";
import type { THeadProps } from "../config/config";

export const THead = ({ children, className, ...rest }: THeadProps) => {


    return (
        <thead {...rest} className={className || styles.thead}>
            {children}
        </thead>
    )
}