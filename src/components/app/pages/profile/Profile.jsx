import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./profile.module.css";
import {
	Input,
	Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { putchUpdateUserInfoOnServer } from "../../../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../../../services/actions/getUserInfo";
import { getLogout } from "../../../../services/actions/logout";
import { changeUserInfoProfile } from "../../../../services/actions/updateUrerInfo";

export function Profile() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.registration.getUser.user);
	const [isLoader, setIsLoader] = useState(true);
	const [value, setValue] = useState({
		email: "",
		password: "",
		name: "",
	});

	const handleChange = (e) => {
		setValue({ ...value, [e.target.name]: e.target.value });
	};

	const updateUserInfo = () => {
		dispatch(changeUserInfoProfile(value));
	};

	const handleLogOut = () => {
		dispatch(getLogout());
	};

	const handleUserInfo = () => {
		dispatch(getUserInfo());
	};

	useEffect(() => {
		user ? setIsLoader(false) : setIsLoader(true);
	}, [user]);

	useEffect(() => {
		user
			? setValue({ ...value, name: user.name, email: user.email })
			: setValue({ ...value });
	}, [user]);

	useEffect(() => {
		handleUserInfo();
	}, []);

	return isLoader ? (
		<div>is loading...</div>
	) : (
		<div className={styles.profile}>
			{" "}
			<div className={styles.page}>
				<NavLink
					to="/profile"
					className={styles.isActive + " text text_type_main-medium"}>
					Профиль
				</NavLink>
				<NavLink
					to="/profile/orders/:id"
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
			<div className={styles.profileInfo + " ml-15"}>
				{" "}
				<Input
					type={"text"}
					placeholder={"Имя"}
					icon={"EditIcon"}
					value={value.name}
					name={"name"}
					onChange={handleChange}
					error={false}
					errorText={"Ошибка"}
					size={"default"}
					extraClass="mt-6"
					// onIconClick={onIconClick}
				/>
				<Input
					type={"text"}
					placeholder={"Логин"}
					icon={"EditIcon"}
					value={value.email}
					onChange={handleChange}
					error={false}
					name={"email"}
					errorText={"Ошибка"}
					size={"default"}
					extraClass="mt-6"
					// onIconClick={onIconClick}
				/>{" "}
				<Input
					type={"password"}
					placeholder={"Пароль"}
					onChange={handleChange}
					icon={"EditIcon"}
					value={value.password}
					name={"password"}
					error={false}
					// onIconClick={onIconClick}
					errorText={"Ошибка"}
					size={"default"}
					extraClass="mt-6"
				/>
				<div className="mt-6">
					{" "}
					<Button
						onClick={updateUserInfo}
						htmlType="button"
						type="primary"
						size="small"
						extraClass="ml-30">
						Сохранить
					</Button>
					<Button
						onClick={handleUserInfo}
						htmlType="button"
						type="primary"
						size="small"
						extraClass="ml-10">
						Отмена
					</Button>
				</div>
			</div>
		</div>
	);
}
