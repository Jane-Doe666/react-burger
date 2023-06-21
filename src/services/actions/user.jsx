import { getRefreshTokenOnServer, getUserInfoOnServer } from "../api";
import { getCookie, setCookie } from "../utile/utile";
import { getRefreshToken, REFRESH_TOKEN } from "./refreshToken";

export const AUTH_CHECKED = "AUTH_CHECKED";
export const USER_SUCCESS = "USER_SUCCESS";

export const checkAuth = () => {
	return function (dispatch) {
		if (!getCookie("accessToken")) {
			dispatch({ type: AUTH_CHECKED });
			console.log("user do not have access");
		}
		getUserInfoOnServer()
			.then((data) => {
				console.log("checkAuth 1");
				dispatch({ type: USER_SUCCESS, payload: data });
			})
			.catch((err) => {
				if (err.message === "jwt expired") {
					console.log("error - jwt expired !!! ");
					getRefreshTokenOnServer()
						.then((data) => {
							console.log("refresh   ", data);
							setCookie("refreshToken", data.refreshToken, {});
							setCookie("accessToken", data.accessToken, {
								"max-age": 1200000,
							});

							dispatch({ type: REFRESH_TOKEN, payload: data });
							console.log("токены обновлены");
						})

						.catch((err) => {
							console.error(`Ошибка: ${err.message} !!!`);
						});
				}
			});
	};
};
