import { getUserInfoOnServer } from "../api";
import { getAuthorization } from "./authorization";
import { getRefreshToken } from "./refreshToken";

export const GET_USER_INFO = "PROFILE/GET_USER_INFO";
export const LOADING = "LOADING";

export function getUserInfo() {
	return function (dispatch) {
		getUserInfoOnServer()
			.then((data) => {
				// console.log(777, data);
				dispatch({ type: GET_USER_INFO, payload: data });
			})

			.catch((err) => {
				console.error(`Ошибка: ${err}`);
				dispatch(getRefreshToken());
				dispatch(getUserInfo());
			});

		// dispatch({ type: LOADING, payload: false });
	};
}
