import styles from './fileField.module.scss';
import type { FileFieldProps } from './types';




export const FileField = ({ dropzoneClassName, ...rest }: FileFieldProps) => {

    
    return (
        <div className={`${styles.fileField} ${dropzoneClassName || ''}`}>
            <input 
                type="file"
                {...rest}
                className={styles.fileInput}
            />
        </div>
    )
}