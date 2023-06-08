import { getUserInfoOnServer } from "../api";
import { getCookie } from "../utile/utile";
import { getRefreshToken } from "./refreshToken";

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
				dispatch({ type: USER_SUCCESS, payload: data });
			})
			.catch(getRefreshToken(), getUserInfoOnServer());
	};
};
