import { getRefreshTokenOnServer } from "../api";
import { setCookie } from "../utile/utile";

export const REFRESH_TOKEN = "LOGIN/REFRESH_TOKEN_SUCCESS";

export function getRefreshToken() {
	return function (dispatch) {
		console.log(4);
		getRefreshTokenOnServer()
			.then((data) => {
				setCookie("refreshToken", data.refreshToken, {});
				setCookie("accessToken", data.accessToken, {
					"max-age": 1200000,
				});

				dispatch({ type: REFRESH_TOKEN, payload: data });
			})

			.catch((err) => {
				console.error(`Ошибка: ${err}`);
			});
	};
}
