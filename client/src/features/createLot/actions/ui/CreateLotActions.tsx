import { Button } from "@shared/ui/button";
import { useCreateLotMutation } from "@shared/api/lot/lot.api";
import { UseFormHandleSubmit } from "react-hook-form";
import { CreateLotFormValues } from "../../form/config/config";
import { CreateLotData } from "@/entities/lot/types/types";
import { formatData } from "../config/config";

import { links } from "@/shared/config";
import { useRouter } from "next/navigation";


interface CreateLotActionsProps {
    handleSubmit: UseFormHandleSubmit<CreateLotFormValues>;
}

export const CreateLotActions = ({ handleSubmit }: CreateLotActionsProps) => {
    const router = useRouter();
    const [createLot, { isLoading }] = useCreateLotMutation();

    const onSubmit = async (data: CreateLotFormValues) => {
        const formattedData = await formatData(data);
        
        try {
            const res = await createLot(formattedData as unknown as CreateLotData).unwrap();
            router.push(links.lotPage.href(res.id));
        }catch (err) {
            console.log(err);
            alert('Произошла ошибка');
        }
    }

    return (
        <Button
            variant="secondary"
            size="default"
            type="submit"
            loading={isLoading}
            onClick={handleSubmit(onSubmit)}
        >
            Опубликовать
        </Button>
    )
}