

export type ButtonVariant = 'primary' | 'secondary' | 'clear';
export type ButtonSize = 'default' | 'small';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    children: React.ReactNode;
    className?: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
}