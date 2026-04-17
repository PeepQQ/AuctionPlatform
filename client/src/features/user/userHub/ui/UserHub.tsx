'use client';
import { Button } from '@/shared/ui/button/Button';
import styles from './userHub.module.scss';
import { useGetUserQuery, useLogoutMutation} from '@/shared/api/user/user.api';
import { links } from '@shared/config';
import { useRouter } from 'next/navigation';


export const UserHub = () => {
    const router = useRouter();
    const { data: user } = useGetUserQuery();
    const [logout] = useLogoutMutation();

    if (!user) {
        return (
            <div className={styles.userHub}>
                <Button variant='secondary'
                    onClick={() => router.push(links.signIn.href)}
                >
                    Войти
                </Button>
                <Button variant='secondary'
                    onClick={() => router.push(links.signUp.href)}
                >
                    Регистрация
                </Button>
            </div>
        );
    }

    return (
        <div className={styles.userHub}>
            <Button variant='secondary' size='small' onClick={() => router.push(links.createLot.href)}>Создать лот</Button>
            <span className={styles.userHubName}>{user.name}</span>
            <Button variant='secondary' size='small' onClick={() => {
                logout(undefined);
                router.push(links.home.href);
                router.refresh();
            }}>
                Выйти
            </Button>
        </div>
    )
}