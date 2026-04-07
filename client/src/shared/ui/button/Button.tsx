import { ButtonProps } from "./types";
import styles from './button.module.scss';





export const Button = ({ 
    loading = false,
    children, 
    className, 
    variant = 'primary', 
    size = 'default',
    fullWidth = false,
    disabled = false,
    ...props 
}: ButtonProps) => {

    return (
        <button 
            disabled={disabled}
            className={`
                ${styles.button} 
                ${styles[variant]} 
                ${styles[size]} 
                ${fullWidth ? styles.fullWidth : ''} 
                ${className}
            `}
            {...props}
        >
            {loading ? 'Ожидание...' : children}
        </button>
    )
}