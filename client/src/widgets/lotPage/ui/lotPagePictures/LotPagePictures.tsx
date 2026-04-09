'use client';
import { useState, useCallback } from "react";
import { ImageKit } from "@/shared/ui/imageKit"
import styles from "../../styles/lotPagePictures.module.scss";
import type { LotPicture } from "@/entities/lot";
import { AllPicturesList } from "./AllPicturesList";


interface LotPagePicturesProps {
    pictures: LotPicture[]
}

export const LotPagePictures = ({
    pictures
}: LotPagePicturesProps) => {
    const [activePic, setActivePic] = useState(pictures[0]);

    const onSelectActive = (pic: LotPicture) => {
        setActivePic(pic)
    }

    return (
        <div className={styles.lotPictures}>
            <div className={styles.activePicture}>
                <ImageKit 
                    key={activePic.path}
                    src={activePic.path}
                    alt={'Изображение лота'}
                    fill
                />
            </div>
            <AllPicturesList 
                pictures={pictures}
                onSelectActive={onSelectActive}
                activePic={activePic}
            />
        </div>
    )
}