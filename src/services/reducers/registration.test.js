import { AUTHORIZATION_REQUEST } from "../actions/authorization";
import { GET_USER_INFO } from "../actions/getUserInfo";
import { LOGOUT } from "../actions/logout";
import { RESET_PASSWORD } from "../actions/passwordReset";
import { RESTORE_PASSWORD } from "../actions/passwordRestore";
import { REFRESH_TOKEN } from "../actions/refreshToken";
import { REGISTRATION_REQUEST } from "../actions/registration";
import { UPDATE_USER_INFO } from "../actions/updateUrerInfo";
import { AUTH_CHECKED, USER_SUCCESS } from "../actions/user";
import { registrationTest, userTest } from "../utile/codeTest";
import { registrationReducer, initialState } from "./registration";

describe("registrationReducer reducer", () => {
	it("initial state control", () => {
		expect(registrationReducer(undefined, {})).toEqual(initialState);
	});

	it("run AUTH_CHECKED", () => {
		expect(
			registrationReducer(initialState, {
				type: AUTH_CHECKED,
			})
		).toEqual({
			...initialState,
			isAuthChecked: true,
		});
	});

	it("run RESTORE_PASSWORD", () => {
		expect(
			registrationReducer(initialState, {
				type: RESTORE_PASSWORD,
			})
		).toEqual({
			...initialState,
		});
	});

	it("run RESET_PASSWORD", () => {
		expect(
			registrationReducer(initialState, {
				type: RESET_PASSWORD,
			})
		).toEqual({
			...initialState,
		});
	});

	it("run LOGOUT", () => {
		expect(
			registrationReducer(initialState, {
				type: LOGOUT,
				isAuth: false,
				isLogged: false,
				isLoader: true,
				isAuthChecked: true,
			})
		).toEqual({
			...initialState,
			isAuth: false,
			isLogged: false,
			isLoader: true,
			isAuthChecked: true,
		});
	});

	it("run UPDATE_USER_INFO", () => {
		expect(
			registrationReducer(initialState, {
				type: UPDATE_USER_INFO,
			})
		).toEqual({
			...initialState,
		});
	});

	it("run REGISTRATION_REQUEST", () => {
		expect(
			registrationReducer(initialState, {
				type: REGISTRATION_REQUEST,
				payload: registrationTest,
			})
		).toEqual({
			...initialState,
			userName: registrationTest.user.name,
			email: registrationTest.user.email,
			isLogged: true,
			isAuth: true,
			isAuthChecked: true,
		});
	});

	it("run USER_SUCCESS", () => {
		expect(
			registrationReducer(initialState, {
				type: USER_SUCCESS,
				payload: userTest,
			})
		).toEqual({
			...initialState,
			isAuthChecked: true,
			isLogged: true,
			getUser: userTest,
		});
	});

	it("run AUTHORIZATION_REQUEST", () => {
		expect(
			registrationReducer(initialState, {
				type: AUTHORIZATION_REQUEST,
				payload: registrationTest,
			})
		).toEqual({
			...initialState,
			userName: registrationTest.user.name,
			email: registrationTest.user.email,
			isAuth: true,
			isLogged: true,
			isAuthChecked: true,
		});
	});

	it("run GET_USER_INFO", () => {
		expect(
			registrationReducer(initialState, {
				type: GET_USER_INFO,
				payload: userTest,
			})
		).toEqual({
			...initialState,
			getUser: userTest,
			isAuth: true,
			isAuthChecked: true,
			isLogged: true,
		});
	});

	it("run REFRESH_TOKEN", () => {
		expect(
			registrationReducer(initialState, {
				type: REFRESH_TOKEN,
				payload: registrationTest,
			})
		).toEqual({
			...initialState,
			isAuth: registrationTest.success,
			isLogged: registrationTest.success,
			isAuthChecked: true,
		});
	});
});
