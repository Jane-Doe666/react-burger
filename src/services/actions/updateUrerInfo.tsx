import { putchUpdateUserInfoOnServer } from "../api";
import { TValue } from "../utile/types";

export const UPDATE_USER_INFO: "PROFILE/UPDATE_USER_INFO" =
	"PROFILE/UPDATE_USER_INFO";

export type TApdateUserInfoAction = {
	type: typeof UPDATE_USER_INFO;
};

export const changeUserInfoProfile = (value: TValue) => {
	return function (dispatch) {
		putchUpdateUserInfoOnServer(value)
			.then((res) => {
				dispatch({ type: UPDATE_USER_INFO, payload: res });
			})
			.catch((err) => console.log(err));
	};
};
