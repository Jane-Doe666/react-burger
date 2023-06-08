import {
	Input,
	Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getRefreshPassword } from "../../../services/actions/passwordReset";
import styles from "./password-reset.module.css";

export function PasswordReset() {
	type TValue = {
		password: "" | string;
		token: "" | string;
	};

	type TInput = "password" | "text";
	type TIcon = "HideIcon" | "ShowIcon";

	const navigate = useNavigate();
	const dispatch: any = useDispatch();
	const [value, setValue] = useState<TValue>({ password: "", token: "" });
	const [icon, setIcon] = useState<TIcon>("ShowIcon");
	const [typeOfInput, setTypeOfInput] = useState<TInput>("password");

	const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setValue({ ...value, [evt.target.name]: evt.target.value });
	};

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
		dispatch(getRefreshPassword(value, navigate));
	};

	return (
		<form onSubmit={handleNewPassword} className={styles.login}>
			<h2 className="text text_type_main-medium">Восстановление пароля</h2>

			<Input
				type={typeOfInput}
				placeholder={"Введите новый пароль"}
				onChange={onChange}
				icon={icon}
				value={value.password}
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
				onChange={onChange}
				value={value.token}
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
