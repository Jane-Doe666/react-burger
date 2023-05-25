import { putchUpdateUserInfoOnServer } from "../api";

export const UPDATE_USER_INFO = "PROFILE/UPDATE_USER_INFO";

export const changeUserInfoProfile = (value) => {
	return function (dispatch) {
		putchUpdateUserInfoOnServer(value)
			.then((res) => {
				dispatch({ type: UPDATE_USER_INFO, payload: res });
			})
			.catch((err) => console.log(err));
	};
};
