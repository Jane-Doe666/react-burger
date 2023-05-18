import { setLogOutOnServer } from "../api";
import { deleteCookie } from "../utile/utile";

export const LOGOUT = "PROFILE/LOGOUT";

export const getLogout = () => {
	return function (dispatch) {
		setLogOutOnServer()
			.then((res) => {
				deleteCookie("accessToken");
				deleteCookie("refreshToken");
				dispatch({ type: LOGOUT, payload: res });
			})
			.catch((err) => console.log(err));
	};
};
