import React from 'react';
import styles from '../styles/createLotLayout.module.scss';
import clsx from 'clsx';


export interface CreateLotLayoutProps {
    title: string;
    children: React.ReactNode;
}

export const CreateLotLayout = ({ 
    title = 'Создание лота', 
    children
}: CreateLotLayoutProps) => {


    return (
        <section className={clsx(styles.createLotLayout, 'container')}>
            <div className={styles.head}>
                <h1 className={styles.title}>{title}</h1>
            </div>

            <div className={styles.content}>
                {children}
            </div>
        </section>
    )
}