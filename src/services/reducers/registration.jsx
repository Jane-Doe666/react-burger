import { AUTHORIZATION_REQUEST } from "../actions/authorization";
import { DISPATCH_FUNCTION, GET_USER_INFO } from "../actions/getUserInfo";
import { LOGOUT } from "../actions/logout";
import { RESET_PASSWORD } from "../actions/passwordReset";
import { RESTORE_PASSWORD } from "../actions/passwordRestore";
import { REFRESH_TOKEN } from "../actions/refreshToken";
import { REGISTRATION_REQUEST } from "../actions/registration";
import { UPDATE_USER_INFO } from "../actions/updateUrerInfo";

const initialState = {
	getUser: "",
	userName: "",
	email: "",
	userData: {},
	isAuth: false,
	data: {},
	isDispatch: "",
};

export const registrationReducer = (state = initialState, action) => {
	switch (action.type) {
		case DISPATCH_FUNCTION: {
			return {
				...state,
				isDispatch: action.payload,
			};
		}
		case REGISTRATION_REQUEST: {
			return {
				...state,
				userName: action.payload.user.name,
				email: action.payload.user.email,
				isAuth: true,
				isDispatch: false,
			};
		}
		case AUTHORIZATION_REQUEST: {
			return {
				...state,
				userName: action.payload.user.name,
				email: action.payload.user.email,
				userData: { ...action.payload.user },
				isAuth: true,
				isDispatch: false,
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
				isAuth: true,
				isDispatch: false,
			};
		}

		case RESET_PASSWORD: {
			return {
				...state,
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
				isAuth: false,
				isLoader: true,
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
