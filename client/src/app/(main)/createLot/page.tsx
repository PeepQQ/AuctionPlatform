import { CreateLotLayout } from "@/widgets/createLot/ui/CreateLotLayout";
import { CreateLotForm } from "@/features/createLot/form/ui/CreateLotForm";


export default function CreateLotPage() {

  return (
    <CreateLotLayout 
        title="Создание лота" 
    >
        <CreateLotForm />
    </CreateLotLayout>
  );
}