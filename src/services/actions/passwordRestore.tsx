import { NavigateFunction } from "react-router";
import { getResetPasswordOnServer } from "../api";
import { TValue } from "../utile/types";
import { AppThunk } from "../utile/typesRedux";

export const RESTORE_PASSWORD: "RESTORE_PASSWORD/RESTORE_PASSWORD" =
	"RESTORE_PASSWORD/RESTORE_PASSWORD";

export type TRestorePasswordAction = {
	type: typeof RESTORE_PASSWORD;
};

export const getRestorePassword: AppThunk = (
	value: TValue,
	navigate: NavigateFunction
) => {
	return function (dispatch) {
		getResetPasswordOnServer(value)
			.then(() => {
				dispatch({ type: RESTORE_PASSWORD });
				navigate("/reset-password");
			})

			.catch((err) => {
				console.error(`Ошибка: ${err}`);
			});
	};
};
