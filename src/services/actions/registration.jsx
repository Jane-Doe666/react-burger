import { createRegistrationOnServer } from "../api";
import { setCookie } from "../utile/utile";

export const REGISTRATION_REQUEST = "REGISTRATION/REGISTRATION_REQUEST";

export function getRegistration(value, navigate) {
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
}
