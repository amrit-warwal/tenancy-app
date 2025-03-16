import styles from './Nav.module.scss';
import Link from 'next/link';

const navLeftLinks = [
    { path: '/', label: 'Home' },
    { path: '/explore', label: 'Explore' },
];

const navRightLinks = [
    { path: '/signup', label: 'Signup' },
    { path: '/login', label: 'Login' },
];

export default function Nav() {
    return (
        <nav className={styles.nav}>
            <ul className={`${styles.navItems} ${styles['navItems--left']}`}>
                {navLeftLinks.map((link) => (
                    <li key={link.label}>
                        <Link href={link.path}>{link.label}</Link>
                    </li>
                ))}
            </ul>

            <ul className={`${styles.navItems} ${styles['navItems--right']}`}>
                {navRightLinks.map((link) => (
                    <li key={link.label}>
                        <Link href={link.path}>{link.label}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
