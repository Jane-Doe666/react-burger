import {
	Input,
	Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getRefreshPassword } from "../../services/actions/passwordReset";
import { useForm } from "../../services/hooks/hooks";
import { TValue } from "../../services/types/types";
import styles from "./password-reset.module.css";

export function PasswordReset() {
	type TInput = "password" | "text";
	type TIcon = "HideIcon" | "ShowIcon";
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { values, handleChange } = useForm<TValue>({
		password: "",
		token: "",
	});

	const [icon, setIcon] = useState<TIcon>("ShowIcon");
	const [typeOfInput, setTypeOfInput] = useState<TInput>("password");

	const onIconClick = () => {
		setIcon((prevState) =>
			prevState === "ShowIcon" ? "HideIcon" : "ShowIcon"
		);
		setTypeOfInput((prevState) =>
			prevState === "password" ? "text" : "password"
		);
	};

	const handleNewPassword = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		dispatch(getRefreshPassword(values, navigate));
	};

	return (
		<form onSubmit={handleNewPassword} className={styles.login}>
			<h2 className="text text_type_main-medium">Восстановление пароля</h2>

			<Input
				type={typeOfInput}
				placeholder={"Введите новый пароль"}
				onChange={handleChange}
				icon={icon}
				value={values.password}
				name={"password"}
				error={false}
				onIconClick={onIconClick}
				errorText={"Ошибка"}
				size={"default"}
				extraClass="mt-6"
			/>
			<Input
				type={"text"}
				placeholder={"Введите код из письма"}
				onChange={handleChange}
				value={values.token}
				name={"token"}
				error={false}
				errorText={"Ошибка"}
				size={"default"}
				extraClass="mt-6"
			/>
			<div>
				<Button htmlType="submit" type="primary" size="large" extraClass="mt-6">
					Сохранить
				</Button>
			</div>

			<div className={styles.p + " mt-20"}>
				<p className="text text_type_main-default">Вспомнили пароль?</p>{" "}
				<Link
					to="/login"
					className={styles.link_reg + " text text_type_main-default"}>
					Войти
				</Link>
			</div>
		</form>
	);
}
