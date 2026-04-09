import type { LotPicture } from "@/entities/lot"
import { ImageKit } from "@/shared/ui/imageKit"
import clsx from "clsx"
import styles from "../../styles/lotPagePictures.module.scss";


interface AllPicturesListProps {
    pictures: LotPicture[];
    onSelectActive: (pic: LotPicture) => void;
    activePic: LotPicture;
}

export const AllPicturesList = ({
    pictures,
    onSelectActive,
    activePic
}: AllPicturesListProps) => {
    
    return (
        pictures?.map(pic =>
            <div
                className={clsx(styles.lotPicture, activePic.path == pic.path && styles.active)}
                onClick={() => onSelectActive(pic)}
                key={pic.path}
            >
                <ImageKit 
                    key={pic.path}
                    src={pic.path}
                    alt={'Изображение лота'}
                    fill
                />
            </div>
        )
    )
}