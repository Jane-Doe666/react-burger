import { setNewPasswordOnServer } from "../api";

export const RESET_PASSWORD = "PASSWORD_RESET/RESET_PASSWORD";

export function getRefreshPassword(value, navigate) {
	return function (dispatch) {
		setNewPasswordOnServer(value)
			.then((data) => {
				console.log("RESET", data);
				dispatch({ type: RESET_PASSWORD });
				navigate("/");
			})

			.catch((err) => {
				console.error(`Ошибка: ${err}`);
			});
	};
}
