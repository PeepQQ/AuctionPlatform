import { DeleteIcon } from '@/assets/icons';
import styles from '../styles/pictureFields.module.scss';
import Image from 'next/image';



interface UploadedPictureProps {
    picture: File;
    onDelete: () => void;
}

export const UploadedPicture = ({ picture, onDelete }: UploadedPictureProps) => {

    
    return (
        <div key={picture.name} className={styles.pictureItem}>
            <span className={styles.pictureDelete}>
                <DeleteIcon onClick={onDelete} />
            </span>
            <Image 
                src={URL.createObjectURL(picture)} 
                alt={picture.name} 
                fill
                sizes="300px"
                className={styles.pictureImage}
            />
        </div>
    )
}