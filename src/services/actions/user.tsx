import { getRefreshTokenOnServer, getUserInfoOnServer } from "../api";
import { TUser, TUserInfo } from "../utile/types";
import { getCookie, setCookie } from "../utile/utile";
import { REFRESH_TOKEN } from "./refreshToken";

export const AUTH_CHECKED: "AUTH_CHECKED" = "AUTH_CHECKED";
export const USER_SUCCESS: "USER_SUCCESS" = "USER_SUCCESS";

export interface IAuthChecked {
	type: typeof AUTH_CHECKED;
}

export interface IUserSuccess {
	type: typeof USER_SUCCESS;
	payload: { success: boolean; user: { email: string; name: string } };
}

export type TUserActions = IAuthChecked | IUserSuccess;

export const checkAuth = () => {
	return function (dispatch) {
		if (!getCookie("accessToken")) {
			dispatch({ type: AUTH_CHECKED });
			console.log("user do not have access");
		}
		getUserInfoOnServer()
			.then((data) => {
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
