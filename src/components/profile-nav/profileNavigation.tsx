import { NavLink } from "react-router-dom";
import styles from "../../pages/profile/profile.module.css";
import { getLogout } from "../../services/actions/logout";
import { useLocation } from "react-router";
import { useAppDispatch } from "../../services/types/typesRedux";

export function ProfileNavigation() {
	const dispatch = useAppDispatch();
	const handleLogOut = () => {
		dispatch(getLogout());
	};

	return (
		<div className={styles.page}>
			<NavLink
				to="/profile"
				end
				className={({ isActive }) =>
					isActive
						? `${styles.link_active + " text text_type_main-medium"}`
						: `${styles.link_iNactive + " text text_type_main-medium"}`
				}>
				Профиль
			</NavLink>
			<NavLink
				to="/profile/orders"
				end
				className={({ isActive }) =>
					isActive
						? `${styles.link_active + " text text_type_main-medium"}`
						: `${styles.link_iNactive + " text text_type_main-medium"}`
				}>
				История заказов
			</NavLink>
			<NavLink
				to="/login"
				onClick={handleLogOut}
				className={styles.p + " text text_type_main-medium"}>
				Выход
			</NavLink>
			<p className={"text text_type_main-default mt-20"}>
				В этом разделе вы можете изменить свои персональные данные
			</p>
		</div>
	);
}
