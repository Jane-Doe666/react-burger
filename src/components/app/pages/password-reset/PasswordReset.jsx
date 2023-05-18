import {
	Input,
	Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getRefreshPassword } from "../../../../services/actions/passwordReset";
import styles from "./password-reset.module.css";

export function PasswordReset() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [value, setValue] = useState({ password: "", token: "" });
	const [icon, setIcon] = useState("ShowIcon");
	const [typeOfInput, setTypeOfInput] = useState("password");

	const onChange = (e) => {
		setValue({ ...value, [e.target.name]: e.target.value });
	};

	const onIconClick = () => {
		setIcon((prevState) =>
			prevState === "ShowIcon" ? "HideIcon" : "ShowIcon"
		);
		setTypeOfInput((prevState) =>
			prevState === "password" ? "text" : "password"
		);
	};

	const handleNewPassword = () => {
		dispatch(getRefreshPassword(value, navigate));
	};

	return (
		<div className={styles.login}>
			<h2 className="text text_type_main-medium">Восстановление пароля</h2>

			<Input
				type={typeOfInput}
				placeholder={"Введите новый пароль"}
				onChange={onChange}
				icon={icon}
				value={value.password}
				name={"password"}
				error={false}
				// ref={inputRef}
				onIconClick={onIconClick}
				errorText={"Ошибка"}
				size={"default"}
				extraClass="mt-6"
			/>
			<Input
				type={"text"}
				placeholder={"Введите код из письма"}
				onChange={onChange}
				value={value.email}
				name={"token"}
				error={false}
				// ref={inputRef}
				errorText={"Ошибка"}
				size={"default"}
				extraClass="mt-6"
			/>
			<div>
				<Button
					onClick={handleNewPassword}
					htmlType="button"
					type="primary"
					size="large"
					extraClass="mt-6">
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
		</div>
	);
}
