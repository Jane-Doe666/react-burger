import { getResetPasswordOnServer } from "../api";

export const RESTORE_PASSWORD = "RESTORE_PASSWORD/RESTORE_PASSWORD";

export function getRestorePassword(value, navigate) {
	return function (dispatch) {
		getResetPasswordOnServer(value)
			.then(() => {
				dispatch({ type: RESTORE_PASSWORD });
				navigate("/reset-password");
				//error in console if navigate ?
			})

			.catch((err) => {
				console.error(`Ошибка: ${err}`);
			});
	};
}
