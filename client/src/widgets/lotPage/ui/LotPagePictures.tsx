'use client';
import { useState } from "react";
import { ImageKit } from "@/shared/ui/imageKit"
import clsx from "clsx";
import styles from "../styles/lotPagePictures.module.scss";


interface LotPagePicturesProps {
    pictures: {path: string}[]
}

export const LotPagePictures = ({
    pictures
}: LotPagePicturesProps) => {
    const [activePic, setActivePic] = useState(pictures[0]);


    return (
        <div className={styles.lotPictures}>
            <div className={styles.activePicture}>
                <ImageKit 
                    key={activePic.path}
                    src={activePic.path}
                    alt={activePic.path}
                    fill
                />
            </div>
            {pictures?.map(pic =>
                <div 
                    className={clsx(styles.lotPicture, activePic.path == pic.path && styles.active)}
                    onClick={() => setActivePic(pic)}
                    key={pic.path}
                >
                    <ImageKit 
                        key={pic.path}
                        src={pic.path}
                        alt={pic.path}
                        fill
                    />
                </div>
            )}
        </div>
    )
}