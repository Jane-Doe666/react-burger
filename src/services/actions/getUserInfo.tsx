import { getUserInfoOnServer } from "../api";
import { TUserInfo, TUser } from "../utile/types";
import { AppThunk } from "../utile/typesRedux";
import { getRefreshToken } from "./refreshToken";

export const GET_USER_INFO: "PROFILE/GET_USER_INFO" = "PROFILE/GET_USER_INFO";
export type TGetUserInfo = {
	type: typeof GET_USER_INFO;
	payload: { success: boolean; user: { email: string; name: string } };
};

export const getUserInfo = () => {
	return function (dispatch) {
		getUserInfoOnServer()
			.then((data) => {
				dispatch({ type: GET_USER_INFO, payload: data });
			})

			.catch((err) => {
				console.error(`Ошибка: ${err}`);
				dispatch(getRefreshToken());
				dispatch(getUserInfo());
			});
	};
};
