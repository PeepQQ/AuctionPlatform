import styles from './header.module.scss';
import { headerLinks } from '@shared/config';
import { NavLink } from '@shared/ui/navLink';
import { UserHub } from '@features/user/userHub/ui/UserHub';

export const Header = () => {

    return (
        <header
            className={`${styles.header} container`}
        >
            <div className={styles.content}>
                <div className={styles.headerLogo}>
                    <span>AutoPanel</span>
                </div>
                <div className={styles.headerNav}>
                    {headerLinks.map((link) => (
                        <NavLink
                            key={link.href}
                            href={link.href}
                            className={styles.headerNavLink}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>
                <UserHub />
            </div>
        </header>
    );
};