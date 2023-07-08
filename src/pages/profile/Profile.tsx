import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import {
	Input,
	Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../../services/actions/getUserInfo";
import { changeUserInfoProfile } from "../../services/actions/updateUrerInfo";
import { useForm } from "../../services/hooks/hooks";
import { TValue } from "../../services/types/types";
import { useLocation } from "react-router";
import { ProfileNavigation } from "../../components/profile-nav/ProfileNavigation";
import { OrdersPrivate } from "../orders-private/OrdersPrivate";
import { useAppSelector } from "../../services/types/typesRedux";

export function Profile() {
	type TLoader = Boolean;
	const dispatch = useDispatch();
	const loc = useLocation();

	const user = useAppSelector((state) => state.registration.getUser?.user);

	const [isLoader, setIsLoader] = useState<TLoader>(true);
	const { values, handleChange, setValues } = useForm<TValue>({
		email: "",
		password: "",
		name: "",
	});

	const updateUserInfo = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		dispatch(changeUserInfoProfile(values));
	};

	const handleUserInfo = () => {
		dispatch(getUserInfo());
	};

	useEffect(() => {
		handleUserInfo();
	}, []);

	useEffect(() => {
		user ? setIsLoader(false) : setIsLoader(true);
	}, [user]);

	useEffect(() => {
		user
			? setValues({ ...values, name: user.name, email: user.email })
			: setValues({ ...values });
	}, [user]);

	return isLoader ? (
		<div>is loading...</div>
	) : (
		<>
			<div className={styles.profile}>
				<ProfileNavigation />
				{loc.pathname === "/profile/orders" ? (
					<OrdersPrivate />
				) : (
					<form
						onSubmit={updateUserInfo}
						className={styles.profileInfo + " ml-15"}>
						{" "}
						<Input
							type={"text"}
							placeholder={"Имя"}
							icon={"EditIcon"}
							value={values.name}
							name={"name"}
							onChange={handleChange}
							error={false}
							errorText={"Ошибка"}
							size={"default"}
							extraClass="mt-6"
						/>
						<Input
							type={"text"}
							placeholder={"Логин"}
							icon={"EditIcon"}
							value={values.email}
							onChange={handleChange}
							error={false}
							name={"email"}
							errorText={"Ошибка"}
							size={"default"}
							extraClass="mt-6"
						/>{" "}
						<Input
							type={"password"}
							placeholder={"Пароль"}
							onChange={handleChange}
							icon={"EditIcon"}
							value={values.password}
							name={"password"}
							error={false}
							errorText={"Ошибка"}
							size={"default"}
							extraClass="mt-6"
						/>
						<div className={styles.button + " mt-6"}>
							<Button htmlType="submit" type="primary" size="small">
								Сохранить
							</Button>
							<Button
								onClick={handleUserInfo}
								htmlType="button"
								type="primary"
								size="small">
								Отмена
							</Button>
						</div>
					</form>
				)}
			</div>
		</>
	);
}
