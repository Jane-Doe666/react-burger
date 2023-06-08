import { getAuthorizationOnServer } from "../api";
import { setCookie } from "../utile/utile";

export const AUTHORIZATION_REQUEST = "LOGIN/AUTHORIZATION_REQUEST";

export function getAuthorization(value, location, navigate) {
	return function (dispatch) {
		console.log(5, location);
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
}
