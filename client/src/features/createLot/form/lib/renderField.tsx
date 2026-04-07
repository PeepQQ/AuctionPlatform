import { FieldErrors, UseFormRegister, type Path } from "react-hook-form"
import { InputField } from "@/shared/ui/form/input/InputField"
import { CreateLotFieldConfig, CreateLotFormValues } from "../config/config"
import { Textarea } from "@/shared/ui/form/textarea"





export const renderField = (
    field: CreateLotFieldConfig, 
    register: UseFormRegister<CreateLotFormValues>, 
    errors: FieldErrors<CreateLotFormValues>
) => {
    switch (field.field) {
        case 'input':
            return <InputField key={field.name} name={field.name as Path<CreateLotFormValues>} label={field.label} type={field.type} placeholder={field.placeholder} onlyNum={field.onlyNum} register={register} error={(errors as any)[field.name as Path<CreateLotFormValues>]?.message} className={field.className} />
        case 'textarea':
            return <Textarea key={field.name} name={field.name as Path<CreateLotFormValues>} label={field.label} placeholder={field.placeholder} register={register} error={(errors as any)[field.name as Path<CreateLotFormValues>]?.message} className={field.className} />
    }
}   