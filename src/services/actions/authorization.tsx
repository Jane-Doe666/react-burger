import { NavigateFunction } from "react-router";
import { getAuthorizationOnServer } from "../api";
import { TRegistrationAnswer, TValue } from "../types/types";
import { AppThunk } from "../types/typesRedux";
import { setCookie } from "../utile/utile";

export const AUTHORIZATION_REQUEST: "LOGIN/AUTHORIZATION_REQUEST" =
	"LOGIN/AUTHORIZATION_REQUEST";

export interface IAuthorizationRequest {
	readonly type: typeof AUTHORIZATION_REQUEST;
	payload: TRegistrationAnswer;
}

export const getAuthorization: AppThunk = (
	value: TValue,
	location: string,
	navigate: NavigateFunction
) => {
	return function (dispatch) {
		getAuthorizationOnServer(value)
			.then((data) => {
				setCookie("accessToken", data.accessToken, {
					"max-age": 1200000,
				});
				setCookie("refreshToken", data.refreshToken, {});

				dispatch({ type: AUTHORIZATION_REQUEST, payload: data });
				navigate(location || "/", { replace: true });
				return data;
			})

			.catch((err) => {
				console.error(`Ошибка: ${err}`);
			});
	};
};
