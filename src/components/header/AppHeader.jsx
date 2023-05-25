import {
	Logo,
	BurgerIcon,
	ProfileIcon,
	ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
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
					to="/profile/orders"
					className={location === "/profile/orders" ? styles.b : styles.a}>
					<ListIcon
						type={location === "/profile/orders" ? "primary" : "secondary"}
					/>
					<p className="text text_type_main-default pr-5 pl-2">Лента заказов</p>
				</NavLink>
			</div>

			<div className={styles.logo}>
				<Logo />
			</div>

			<div className={`${styles.div} ${styles.mr}`}>
				<NavLink
					to="/profile"
					className={location === "/profile" ? styles.b : styles.a}>
					<ProfileIcon
						type={location === "/profile" ? "primary" : "secondary"}
					/>
					<p className="text text_type_main-default pr-5 pl-2">
						Личный кабинет
					</p>
				</NavLink>
			</div>
		</header>
	);
}
