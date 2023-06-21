import { getUserInfoOnServer } from "../api";
import { getRefreshToken } from "./refreshToken";

export const GET_USER_INFO = "PROFILE/GET_USER_INFO";

export function getUserInfo() {
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
}
