'use client';
import styles from './timer.module.scss';
import { useTimer } from 'react-timer-hook';



interface TimerProps {
    expiryTimestamp: Date;
    expireHandler: () => void;
}

export const Timer = ({
    expiryTimestamp,
    expireHandler
}: TimerProps) => {
    const {
        seconds,
        minutes,
        hours,
        days,
    } = useTimer({ expiryTimestamp: new Date(expiryTimestamp), onExpire: expireHandler });

    return (
        <div className={styles.timerWrapper}>
            <div className={styles.timeGroup}>
                {days} д
            </div>
            <div className={styles.timeGroup}>
                {hours} ч
            </div>
            <div className={styles.timeGroup}>
                {minutes} м
            </div>
            <div className={styles.timeGroup}>
                {seconds} с
            </div>
        </div>
    )
}