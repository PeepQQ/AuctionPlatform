import type { InputHTMLAttributes } from "react";



export type FileFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    dropzoneClassName?: string;
}