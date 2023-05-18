import {
	EmailInput,
	Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getRestorePassword } from "../../../../services/actions/passwordRestore";
import styles from "./restore-pass.module.css";

export function RestorePassword() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [value, setValue] = useState({ email: "" });
	const onChange = (e) => {
		setValue({ ...value, [e.target.name]: e.target.value });
	};

	const handleResetPassword = () => {
		dispatch(getRestorePassword(value, navigate));
	};

	return (
		<div className={styles.login}>
			<h2 className="text text_type_main-medium">Восстановление пароля</h2>

			<EmailInput
				placeholder="Укажите e-mail"
				onChange={onChange}
				value={value.email}
				name={"email"}
				isIcon={false}
				extraClass="mt-6"
			/>
			<div>
				<Button
					onClick={handleResetPassword}
					htmlType="button"
					type="primary"
					size="large"
					extraClass="mt-6">
					Восстановить
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
