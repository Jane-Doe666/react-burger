import { AUTHORIZATION_REQUEST } from "../actions/authorization";
import { LOADING, GET_USER_INFO } from "../actions/getUserInfo";
import { LOGOUT } from "../actions/logout";
import { RESET_PASSWORD } from "../actions/passwordReset";
import { RESTORE_PASSWORD } from "../actions/passwordRestore";
import { REFRESH_TOKEN } from "../actions/refreshToken";
import { REGISTRATION_REQUEST } from "../actions/registration";
import { UPDATE_USER_INFO } from "../actions/updateUrerInfo";
import { AUTH_CHECKED, USER_SUCCESS } from "../actions/user";

const initialState = {
	getUser: "",
	userName: "",
	email: "",
	userData: {},
	isAuth: false,
	data: {},
	isLoader: false,
	isAuthChecked: false,
	isLogged: false,
	user: false,
};

export const registrationReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOADING: {
			return {
				...state,
				isLoader: action.payload,
				isLogged: action?.payload?.success,
				isAuthChecked: true,
			};
		}
		case REGISTRATION_REQUEST: {
			return {
				...state,
				userName: action.payload.user.name,
				email: action.payload.user.email,
				isLogged: action?.payload?.success,
				isAuth: true,
				isAuthChecked: true,
			};
		}
		case AUTH_CHECKED: {
			return {
				...state,
				isAuthChecked: true,
			};
		}
		case USER_SUCCESS: {
			return {
				...state,
				isAuthChecked: true,
				isLogged: action.payload.success,
				user: action.payload.user,
			};
		}
		case AUTHORIZATION_REQUEST: {
			return {
				...state,
				userName: action.payload.user.name,
				email: action.payload.user.email,
				userData: { ...action.payload.user },
				isAuth: true,
				isLogged: action.payload.success,
				isAuthChecked: true,
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
				isLogged: action?.payload?.success,
				isAuthChecked: true,
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
				isAuth: action.payload.success,
				isLogged: action?.payload?.success,
				isAuthChecked: true,
			};
		}

		case LOGOUT: {
			return {
				...state,
				isAuth: false,
				isLogged: false,
				isLoader: true,
				isAuthChecked: true,
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
