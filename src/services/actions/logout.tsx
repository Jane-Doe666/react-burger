import { setLogOutOnServer } from "../api";
import { AppThunk } from "../utile/typesRedux";
import { deleteCookie } from "../utile/utile";

export const LOGOUT: "PROFILE/LOGOUT" = "PROFILE/LOGOUT";

export type TLogOut = {
	type: typeof LOGOUT;
};

export const getLogout: AppThunk = () => {
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
