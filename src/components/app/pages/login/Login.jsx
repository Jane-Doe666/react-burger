import {
	EmailInput,
	Button,
	Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAuthorization } from "../../../../services/actions/authorization";
import styles from "./login.module.css";

export function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [value, setValue] = useState({ email: "", password: "" });
	const [icon, setIcon] = useState("ShowIcon");
	const [typeOfInput, setTypeOfInput] = useState("password");

	const onChange = (e) => {
		setValue({ ...value, [e.target.name]: e.target.value });
	};

	const handleAuthorization = () => {
		dispatch(getAuthorization(value, navigate));
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
		<div className={styles.login}>
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
				<Button
					onClick={handleAuthorization}
					htmlType="button"
					type="primary"
					size="large"
					extraClass="mt-6">
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
		</div>
	);
}
