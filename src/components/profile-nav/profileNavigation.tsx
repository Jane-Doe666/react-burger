import { NavLink } from "react-router-dom";
import styles from "../../pages/profile/profile.module.css";
import { useDispatch } from "react-redux";
import { getLogout } from "../../services/actions/logout";
import { useLocation } from "react-router";

export function ProfileNavigation() {
	const dispatch = useDispatch();
	const handleLogOut = () => {
		dispatch(getLogout());
	};

	const { pathname } = useLocation();

	return (
		<div className={styles.page}>
			<NavLink
				to="/profile"
				className={styles.p + " text text_type_main-medium"}
				style={{ color: pathname === "/profile" ? "white" : "#8585ad" }}>
				Профиль
			</NavLink>
			<NavLink
				to="/profile/orders"
				className={styles.p + " text text_type_main-medium"}
				style={{ color: pathname === "/profile/orders" ? "white" : "#8585ad" }}>
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
