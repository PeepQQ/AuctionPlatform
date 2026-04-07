'use client'
import { createLotFormSchema, CreateLotFormValues } from "../config/config"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { CreateLotActions } from "../../actions/ui/CreateLotActions"
import styles from '../styles/createLotForm.module.scss'
import { HeadFields } from "./HeadFields"
import { PictureFields } from "./PictureFields"

export const CreateLotForm = () => {
    const { 
        register, 
        handleSubmit, 
        setValue, 
        watch, 
        formState: { errors } 
    } = useForm<CreateLotFormValues>({
        resolver: yupResolver(createLotFormSchema),
        defaultValues: {
            price: 1,
        }
    })

    return (
        <form className={styles.createLotForm}>
            <div className={styles.headFields}>
                <HeadFields register={register} errors={errors} />
            </div>
            <div className={styles.pictureField}>
                <h2 className={styles.pictureFieldsTitle}>Изображения</h2>
                <PictureFields setValue={setValue} watch={watch} />
            </div>
            <div className={styles.createLotFormActions}>
                <CreateLotActions 
                    handleSubmit={handleSubmit}
                />
            </div>
        </form>
    )
}