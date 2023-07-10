import { NavigateFunction } from "react-router";
import { createRegistrationOnServer } from "../api";
import { TRegistrationAnswer, TValue } from "../types/types";
import { AppThunk } from "../types/typesRedux";
import { setCookie } from "../utile/utile";

export const REGISTRATION_REQUEST: "REGISTRATION/REGISTRATION_REQUEST" =
	"REGISTRATION/REGISTRATION_REQUEST";

export type TRegistrationRequest = {
	type: typeof REGISTRATION_REQUEST;
	payload: TRegistrationAnswer;
};

export const getRegistration: AppThunk = (
	value: TValue,
	navigate: NavigateFunction
) => {
	return function (dispatch) {
		createRegistrationOnServer(value)
			.then((res) => {
				setCookie("accessToken", res.accessToken, {
					"max-age": 1200000,
				});
				setCookie("refreshToken", res.refreshToken, {});
				dispatch({
					type: REGISTRATION_REQUEST,
					payload: res,
				});
				navigate("/");
			})
			.catch((err) => {
				console.error(`Ошибка: ${err}`);
			});
	};
};
