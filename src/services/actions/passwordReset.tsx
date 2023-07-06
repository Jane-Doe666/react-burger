import { NavigateFunction } from "react-router";
import { setNewPasswordOnServer } from "../api";
import { TValue } from "../utile/types";

export const RESET_PASSWORD: "PASSWORD_RESET/RESET_PASSWORD" =
	"PASSWORD_RESET/RESET_PASSWORD";

export type TResetPasswordAction = {
	type: typeof RESET_PASSWORD;
};

export function getRefreshPassword(value: TValue, navigate: NavigateFunction) {
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
