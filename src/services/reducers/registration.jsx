import { AUTHORIZATION_REQUEST } from "../actions/authorization";
import { GET_USER_INFO } from "../actions/getUserInfo";
import { LOGOUT } from "../actions/logout";
import { RESET_PASSWORD } from "../actions/passwordReset";
import { RESTORE_PASSWORD } from "../actions/passwordRestore";
import { REFRESH_TOKEN } from "../actions/refreshToken";
import { REGISTRATION_REQUEST } from "../actions/registration";
import { UPDATE_USER_INFO } from "../actions/updateUrerInfo";

const initialState = {
	getUser: "",
	itemsRequest: false,
	userName: "",
	email: "",
	isAuth: false,
	data: {},
};

export const registrationReducer = (state = initialState, action) => {
	switch (action.type) {
		case REGISTRATION_REQUEST: {
			return {
				...state,
				data: { ...action.payload },
				userName: action.payload.user.name,
				email: action.payload.user.email,
				isAuth: true,
				itemsRequest: false,
			};
		}
		case AUTHORIZATION_REQUEST: {
			return {
				...state,
				data: { ...action.payload },
				// userName: action.payload.user.name,
				// email: action.payload.user.email,
				isAuth: true,
				itemsRequest: false,
			};
		}

		case RESTORE_PASSWORD: {
			return {
				...state,
			};
		}

		case GET_USER_INFO: {
			return {
				...state,
				getUser: action.payload,
			};
		}

		case RESET_PASSWORD: {
			return {
				...state,
				// need to add message ?
			};
		}

		case REFRESH_TOKEN: {
			return {
				...state,
			};
		}

		case LOGOUT: {
			return {
				...state,
			};
		}

		case UPDATE_USER_INFO: {
			return {
				...state,
			};
		}

		default: {
			return state;
		}
	}
};
