import { getCookie } from "./utile/utile";
import {
	TAuth,
	TIngredirntsArray,
	TPasswordResetReset,
	TRegister,
	TReset,
} from "./utile/types";

const config = {
	BASE_URL: "https://norma.nomoreparties.space/api/",
	headers: { "Content-Type": "application/json" },
};

async function checkResponse(response: any) {
	if (response.ok) {
		return response.json();
	} else {
		return response.json().then((err: any) => Promise.reject(err));
	}
}

const checkSuccess = (res: any) => {
	if (res && res.success) {
		return res;
	}
	return Promise.reject(`Ответ не success: ${res}`);
};

const request: any = (endpoint: string, options: any) => {
	return fetch(`${config.BASE_URL}${endpoint}`, options)
		.then(checkResponse)
		.then(checkSuccess);
};

export const getBurgerIngredientsFromServer = () => request(`ingredients`);

export const getIdOrderFromServer = (array: TIngredirntsArray) => {
	return request(`orders`, {
		method: "POST",
		headers: config.headers,
		body: JSON.stringify(array),
	});
};

export const createRegistrationOnServer = (object: TRegister) => {
	return request("auth/register", {
		method: "POST",
		headers: config.headers,
		body: JSON.stringify(object),
	});
};

export const getAuthorizationOnServer = (object: TAuth) => {
	return request(`auth/login`, {
		method: "POST",
		headers: config.headers,
		body: JSON.stringify(object),
	});
};

export const getResetPasswordOnServer = (object: TReset) => {
	return request(`password-reset`, {
		method: "POST",
		headers: config.headers,
		body: JSON.stringify(object),
	});
};

export const setNewPasswordOnServer = (object: TPasswordResetReset) => {
	return request(`password-reset/reset`, {
		method: "POST",
		headers: config.headers,
		body: JSON.stringify(object),
	});
};

export const getRefreshTokenOnServer = () => {
	console.log("run api getRefreshTokenOnServer");
	return request(`auth/token`, {
		method: "POST",
		headers: config.headers,
		body: JSON.stringify({
			token: getCookie("refreshToken"),
		}),
	});
};

export const getUserInfoOnServer = () => {
	return request(`auth/user`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
			Authorization: getCookie("accessToken"),
		},
	});
};

export const setLogOutOnServer = () => {
	return request(`auth/logout`, {
		method: "POST",
		headers: config.headers,
		body: JSON.stringify({
			token: getCookie("refreshToken"),
		}),
	});
};

export const putchUpdateUserInfoOnServer = (object: TAuth) => {
	return request(`auth/user`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
			Authorization: getCookie("accessToken"),
		},
		body: JSON.stringify(object),
	});
};
