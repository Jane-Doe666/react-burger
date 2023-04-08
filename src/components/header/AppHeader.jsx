import {
	Logo,
	BurgerIcon,
	ProfileIcon,
	ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./appHeader.module.css";

export default function AppHeader() {
	return (
		<header className={styles.header}>
			<div className={`${styles.div} ${styles.ml}`}>
				<a href="#" className={styles.a}>
					<BurgerIcon type="secondary" />
					<p className="text text_type_main-default pr-5 pl-2">Конструктор</p>
				</a>
				<a href="#" className={styles.a}>
					<ListIcon type="secondary" />
					<p className="text text_type_main-default pr-5 pl-2">Лента заказов</p>
				</a>
			</div>

			<div className={styles.div}>
				<Logo />
			</div>

			<div className={`${styles.div} ${styles.mr}`}>
				<a href="#" className={styles.a}>
					<ProfileIcon type="secondary" />
					<p className="text text_type_main-default pr-5 pl-2">
						Личный кабинет
					</p>
				</a>
			</div>
		</header>
	);
}
