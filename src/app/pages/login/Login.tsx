import {
	EmailInput,
	Button,
	Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuthorization } from "../../../services/actions/authorization";
import styles from "./login.module.css";

export function Login() {
	type TValue = {
		email: "" | string;
		password: "" | string;
	};
	type TIcon = "ShowIcon" | "HideIcon";
	type TImput = "password" | "text";

	const navigate = useNavigate();
	const dispatch: any = useDispatch();
	const location = useLocation();
	const [value, setValue] = useState<TValue>({ email: "", password: "" });
	const [icon, setIcon] = useState<TIcon>("ShowIcon");
	const [typeOfInput, setTypeOfInput] = useState<TImput>("password");

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue({ ...value, [e.target.name]: e.target.value });
	};

	const handleAuthorization = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		const loc = location?.state?.from?.pathname;
		dispatch(getAuthorization(value, loc, navigate));
	};

	const onIconClick = () => {
		setIcon((prevState) =>
			prevState === "ShowIcon" ? "HideIcon" : "ShowIcon"
		);
		setTypeOfInput((prevState) =>
			prevState === "password" ? "text" : "password"
		);
	};

	return (
		<form onSubmit={handleAuthorization} className={styles.login}>
			<h2 className={"text text_type_main-medium"}>Вход</h2>
			<EmailInput
				onChange={onChange}
				value={value.email}
				name={"email"}
				extraClass="mt-6"
			/>{" "}
			<Input
				type={typeOfInput}
				placeholder={"Пароль"}
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
			<div>
				{" "}
				<Button htmlType="submit" type="primary" size="large" extraClass="mt-6">
					Войти
				</Button>
			</div>
			<div className={styles.p + " mt-20"}>
				<p className="text text_type_main-default">Вы — новый пользователь?</p>
				<Link
					to="/register"
					className={styles.link_reg + " text text_type_main-default"}>
					Зарегистрироваться
				</Link>
			</div>
			<div className={styles.p + " mt-6"}>
				<p className="text text_type_main-default">Забыли пароль?</p>

				<Link
					to="/forgot-password"
					className={styles.link_reg + " text text_type_main-default"}>
					Восстановить пароль
				</Link>
			</div>
		</form>
	);
}
