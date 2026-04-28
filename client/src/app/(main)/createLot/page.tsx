import { CreateLotLayout } from "@/widgets/createLot/ui/CreateLotLayout";
import { CreateLotForm } from "@/features/createLot/form/ui/CreateLotForm";
import styles from "./page.module.scss";

export default function CreateLotPage() {

  return (
    <div className={styles.createLotPage}>
      <CreateLotLayout 
          title="Создание лота" 
      >
          <CreateLotForm />
      </CreateLotLayout>
    </div>
  );
}