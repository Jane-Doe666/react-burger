import { NavLink } from "react-router-dom";
import styles from "../../pages/profile/profile.module.css";
import { useDispatch } from "react-redux";
import { getLogout } from "../../services/actions/logout";

export function ProfileNavigation() {
	const dispatch: any = useDispatch();
	const handleLogOut = () => {
		dispatch(getLogout());
	};

	return (
		<div className={styles.profile}>
			{" "}
			<div className={styles.page}>
				<NavLink
					to="/profile"
					className={styles.isActive + " text text_type_main-medium"}>
					Профиль
				</NavLink>
				<NavLink
					to="/profile/orders"
					className={styles.p + " text text_type_main-medium"}>
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
		</div>
	);
}
