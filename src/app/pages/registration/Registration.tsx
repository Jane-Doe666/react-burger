import {
	Button,
	Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./registration.module.css";
import { getRegistration } from "../../../services/actions/registration";
import { useDispatch } from "react-redux";

export function Registration() {
	type TValue = {
		email: "" | string;
		password: "" | string;
		name: "" | string;
	};

	type TIcon = "HideIcon" | "ShowIcon";
	type TInput = "text" | "password";

	const dispatch: any = useDispatch();
	const navigate = useNavigate();
	const [value, setValue] = useState<TValue>({
		email: "",
		password: "",
		name: "",
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

	const handleRegistration = () => {
		dispatch(getRegistration(value), navigate);
	};

	return (
		<div className={styles.login}>
			<h2 className="text text_type_main-medium">Регистрация</h2>
			<Input
				type={"text"}
				placeholder={"Имя"}
				value={value.name}
				name={"name"}
				onChange={(e) => setValue({ ...value, name: e.target.value })}
				error={false}
				onIconClick={onIconClick}
				errorText={"Ошибка"}
				size={"default"}
				extraClass="mt-6"
			/>
			<Input
				type={"text"}
				placeholder={"E-mail"}
				onChange={(e) => setValue({ ...value, email: e.target.value })}
				value={value.email}
				name={"name"}
				error={false}
				errorText={"Ошибка"}
				size={"default"}
				extraClass="mt-6"
			/>
			<Input
				type={typeOfInput}
				placeholder={"Пароль"}
				onChange={(e) => setValue({ ...value, password: e.target.value })}
				icon={icon}
				value={value.password}
				name={"name"}
				error={false}
				onIconClick={onIconClick}
				errorText={"Ошибка"}
				size={"default"}
				extraClass="mt-6"
			/>
			<div>
				<Button
					onClick={handleRegistration}
					htmlType="button"
					type="primary"
					size="large"
					extraClass="mt-6">
					Зарегистрироваться
				</Button>
			</div>
			<div className={styles.p + "text text_type_main-default mt-20"}>
				Уже зарегистрированы?
				<Link
					to="/login"
					className={styles.link_reg + "text text_type_main-default"}>
					Войти
				</Link>
			</div>
		</div>
	);
}
