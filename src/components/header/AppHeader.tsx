import {
	Logo,
	BurgerIcon,
	ProfileIcon,
	ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./appHeader.module.css";

export default function AppHeader() {
	const location = useLocation().pathname;

	return (
		<header className={styles.header}>
			<div className={styles.div}>
				<NavLink to="/" className={location === "/" ? styles.b : styles.a}>
					<BurgerIcon type={location === "/" ? "primary" : "secondary"} />
					<p className="text text_type_main-default pr-5 pl-2">Конструктор</p>
				</NavLink>

				<NavLink
					to="/feed"
					className={location === "/feed" ? styles.b : styles.a}>
					<ListIcon type={location === "/feed" ? "primary" : "secondary"} />
					<p className="text text_type_main-default pr-5 pl-2">Лента заказов</p>
				</NavLink>
			</div>

			<div className={styles.logo}>
				<Logo />
			</div>

			<div className={`${styles.div} ${styles.mr}`}>
				<NavLink
					to="/profile"
					className={
						location === "/profile" || location === "/profile/orders"
							? styles.b
							: styles.a
					}>
					<ProfileIcon
						type={
							location === "/profile" || location === "/profile/orders"
								? "primary"
								: "secondary"
						}
					/>
					<p className="text text_type_main-default pr-5 pl-2">
						Личный кабинет
					</p>
				</NavLink>
			</div>
		</header>
	);
}
