import Link from "next/link";
import styles from "@/components/Navigation/Navigation.module.scss";

export default function Navigation() {
    return (
        <nav className={styles['navigation']}>
            <ul className={styles['navigation-list']}>
                <li className={styles['navigation-list-item']}>
                    <Link href="/apply">Apply for a loan</Link>
                </li>
                <li className={styles['navigation-list-item']}>
                    <Link href="/history">History logs</Link>
                </li>
            </ul>
        </nav>
    )
}