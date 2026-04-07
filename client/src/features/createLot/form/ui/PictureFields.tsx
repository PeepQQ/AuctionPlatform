import { CreateLotFormValues } from "../config/config";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { FileField } from "@/shared/ui/form";
import styles from '../styles/pictureFields.module.scss';
import { UploadedPicture } from './UploadedPicture';


export interface PictureFieldsProps {
    setValue: UseFormSetValue<CreateLotFormValues>;
    watch: UseFormWatch<CreateLotFormValues>;
}

export const PictureFields = ({ setValue, watch }: PictureFieldsProps) => {
    const pictures = Array.from(watch('pictures') || []) as File[];

    const onDeletePicture = (pictureIndex: number) => {
        setValue('pictures', watch('pictures')?.filter((pic, i) => i !== pictureIndex));
    }

    return (
        <div className={styles.picturesField}>
            {pictures?.length < 3 && (
                <FileField
                    dropzoneClassName={styles.dropzone}
                    onChange={(e) => {
                        const files = e.target.files;
                        if (files) {
                            setValue('pictures', [...(watch('pictures') || []), ...Array.from(files)]);
                        }
                    }}
                />
            )}
            {pictures.length > 0 && (
                <div className={styles.pictureList}>
                    {pictures?.map((picture, index) => (
                        <UploadedPicture 
                            key={picture.name} 
                            picture={picture} 
                            onDelete={() => onDeletePicture(index)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}