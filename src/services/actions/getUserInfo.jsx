import { getUserInfoOnServer } from "../api";
import { getAuthorization } from "./authorization";
import { getRefreshToken } from "./refreshToken";

export const GET_USER_INFO = "PROFILE/GET_USER_INFO";
export const DISPATCH_FUNCTION = "DISPATCH_FUNCTION";

export function getUserInfo() {
	return function (dispatch) {
		getUserInfoOnServer()
			.then((data) => {
				getAuthorization(data.user);
				dispatch({ type: GET_USER_INFO, payload: data });
				dispatch({ type: DISPATCH_FUNCTION, payload: false });
			})

			.catch((err) => {
				console.error(`Ошибка: ${err}`);
				dispatch(getRefreshToken());
				dispatch(getUserInfo());
			});
	};
}
