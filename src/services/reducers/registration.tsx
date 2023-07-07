import {
	AUTHORIZATION_REQUEST,
	IAuthorizationRequest,
} from "../actions/authorization";
import { GET_USER_INFO, TGetUserInfo } from "../actions/getUserInfo";
import { LOGOUT, TLogOut } from "../actions/logout";
import { RESET_PASSWORD, TResetPasswordAction } from "../actions/passwordReset";
import {
	RESTORE_PASSWORD,
	TRestorePasswordAction,
} from "../actions/passwordRestore";
import { REFRESH_TOKEN, TRefreshTokenAction } from "../actions/refreshToken";
import {
	REGISTRATION_REQUEST,
	TRegistrationRequest,
} from "../actions/registration";
import {
	TApdateUserInfoAction,
	UPDATE_USER_INFO,
} from "../actions/updateUrerInfo";
import { AUTH_CHECKED, TUserActions, USER_SUCCESS } from "../actions/user";
import { TAuth, TUser, TUserInfo } from "../utile/types";

type TRgistrationState = {
	getUser: { success: boolean; user: { email: string; name: string } } | "";
	userName: string;
	email: string;
	isAuth: boolean;
	isLoader: boolean;
	isAuthChecked: boolean;
	isLogged: boolean;
	// user: { success: boolean; user: { email: string; name: string } } | null;
};

const initialState: TRgistrationState = {
	getUser: "",
	userName: "",
	email: "",
	isAuth: false,
	isLoader: false,
	isAuthChecked: false,
	isLogged: false,
	// user: null,
};

export type TRegistrationActions =
	| IAuthorizationRequest
	| TRegistrationRequest
	| TGetUserInfo
	| TLogOut
	| TResetPasswordAction
	| TRestorePasswordAction
	| TRefreshTokenAction
	| TApdateUserInfoAction
	| TUserActions;

export const registrationReducer = (
	state: TRgistrationState = initialState,
	action: TRegistrationActions
): TRgistrationState => {
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
			console.log(1, action.payload);
			return {
				...state,
				isAuthChecked: true,
				isLogged: action.payload.success,
				getUser: action.payload,
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
			console.log(2, action.payload);
			return {
				...state,
				getUser: action.payload,
				isAuth: true,
				isLogged: action.payload.success,
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
