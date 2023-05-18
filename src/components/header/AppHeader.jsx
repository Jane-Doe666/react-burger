import {
	Logo,
	BurgerIcon,
	ProfileIcon,
	ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./appHeader.module.css";

export default function AppHeader() {
	const [typeIcon, setTypeIcon] = useState("");

	return (
		<header className={styles.header}>
			<div className={styles.div}>
				<NavLink
					to="/"
					className={styles.a}
					onMouseEnter={() => setTypeIcon("burger")}
					onMouseLeave={() => setTypeIcon("")}>
					<BurgerIcon type={typeIcon === "burger" ? "primary" : "secondary"} />
					<p className="text text_type_main-default pr-5 pl-2">Конструктор</p>
				</NavLink>

				<NavLink
					to="/profile/orders"
					className={styles.a}
					onMouseEnter={() => setTypeIcon("list")}
					onMouseLeave={() => setTypeIcon("")}>
					<ListIcon type={typeIcon === "list" ? "primary" : "secondary"} />
					<p className="text text_type_main-default pr-5 pl-2">Лента заказов</p>
				</NavLink>
			</div>

			<div className={styles.logo}>
				<Logo />
			</div>

			<div className={`${styles.div} ${styles.mr}`}>
				<NavLink
					onMouseEnter={() => setTypeIcon("login")}
					onMouseLeave={() => setTypeIcon("")}
					to="/profile"
					className={styles.a}>
					<ProfileIcon type={typeIcon === "login" ? "primary" : "secondary"} />
					<p className="text text_type_main-default pr-5 pl-2">
						Личный кабинет
					</p>
				</NavLink>
			</div>
		</header>
	);
}
