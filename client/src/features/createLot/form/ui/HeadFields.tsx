import { headFields } from "../config/config"
import { renderField } from "../lib/renderField"
import { type FieldErrors, type UseFormRegister } from "react-hook-form"
import { CreateLotFormValues } from "../config/config"

interface HeadFieldsProps {
    register: UseFormRegister<CreateLotFormValues>
    errors: FieldErrors<CreateLotFormValues>
}


export const HeadFields = ({
    register,
    errors
}: HeadFieldsProps) => {


    return (
        headFields.map((field) => (
            renderField(field, register, errors)
        ))
    )
}