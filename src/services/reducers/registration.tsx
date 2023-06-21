import { AUTHORIZATION_REQUEST } from "../actions/authorization";
import { GET_USER_INFO } from "../actions/getUserInfo";
import { LOGOUT } from "../actions/logout";
import { RESET_PASSWORD } from "../actions/passwordReset";
import { RESTORE_PASSWORD } from "../actions/passwordRestore";
import { REFRESH_TOKEN } from "../actions/refreshToken";
import { REGISTRATION_REQUEST } from "../actions/registration";
import { UPDATE_USER_INFO } from "../actions/updateUrerInfo";
import { AUTH_CHECKED, USER_SUCCESS } from "../actions/user";
import { TAuth } from "../utile/types";

type TUser = {
	email: string;
	name: string;
};

type TInitialState = {
	getUser: TUser | "";
	userName: string;
	email: string;
	isAuth: boolean;
	isLoader: boolean;
	isAuthChecked: boolean;
	isLogged: boolean;
	user: boolean;
};

const initialState: TInitialState = {
	getUser: "",
	userName: "",
	email: "",
	isAuth: false,
	isLoader: false,
	isAuthChecked: false,
	isLogged: false,
	user: false,
};

export const registrationReducer = (state = initialState, action: any) => {
	switch (action.type) {
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
