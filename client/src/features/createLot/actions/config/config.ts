import type { CreateLotFormValues } from "../../form/config/config"



export const formatData = async (data: CreateLotFormValues) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('startAt', data.startAt.toISOString());
    formData.append('price', data.price.toString());
    for (const file of data.pictures ?? []) {
        formData.append('pictures', file as Blob);
    }

    return formData;
}