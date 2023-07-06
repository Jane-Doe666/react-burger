import { getRefreshTokenOnServer } from "../api";
import { getCookie, setCookie } from "../utile/utile";

export const REFRESH_TOKEN: "LOGIN/REFRESH_TOKEN_SUCCESS" =
	"LOGIN/REFRESH_TOKEN_SUCCESS";

export type TRefreshTokenAction = {
	type: typeof REFRESH_TOKEN;
	payload: { success: boolean };
};

export function getRefreshToken() {
	return function (dispatch) {
		if (!getCookie("accessToken")) {
			console.log("user do not have access");
		} else {
			getRefreshTokenOnServer()
				.then((data) => {
					console.log("refresh   ", data);
					setCookie("refreshToken", data.refreshToken, {});
					setCookie("accessToken", data.accessToken, {
						"max-age": 1200000,
					});

					dispatch({ type: REFRESH_TOKEN, payload: data });
				})

				.catch((err) => {
					console.error(`Ошибка: ${err}`);
				});
		}
	};
}
