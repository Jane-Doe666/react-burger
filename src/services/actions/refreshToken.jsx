import { getRefreshTokenOnServer } from "../api";
import { getCookie, setCookie } from "../utile/utile";
import { LOADING } from "./getUserInfo";

export const REFRESH_TOKEN = "LOGIN/REFRESH_TOKEN_SUCCESS";

export function getRefreshToken() {
	return function (dispatch) {
		// dispatch({ type: LOADING, payload: true });
		if (!getCookie("accessToken")) {
			console.log("user do not have access");
			// dispatch({ type: LOADING, payload: false });
		} else {
			getRefreshTokenOnServer()
				.then((data) => {
					console.log("refresh   ", data);
					setCookie("refreshToken", data.refreshToken, {});
					setCookie("accessToken", data.accessToken, {
						"max-age": 1200000,
					});

					dispatch({ type: REFRESH_TOKEN, payload: data });
					// dispatch({ type: LOADING, payload: false });
				})

				.catch((err) => {
					console.error(`Ошибка: ${err}`);
				});
		}
	};
}
