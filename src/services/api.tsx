import { getCookie } from "./utile/utile";
import { TIds, TRegister, TValue } from "./utile/types";

const config = {
	BASE_URL: "https://norma.nomoreparties.space/api/",
	headers: { "Content-Type": "application/json" },
};

const checkResponse = <T,>(response: Response): Promise<T> => {
	if (response.ok) {
		return response.json();
	} else {
		return response.json().then((err: Response) => Promise.reject(err));
	}
};

const checkSuccess = (res: any) => {
	if (res && res.success) {
		return res;
	}
	return Promise.reject(`Ответ не success: ${res}`);
};

export const request = <T,>(
	endpoint: string,
	options?: RequestInit
): Promise<T> => {
	return fetch(`${config.BASE_URL}${endpoint}`, options)
		.then(checkResponse)
		.then(checkSuccess);
};

export const getBurgerIngredientsFromServer = (): Promise<any> =>
	request(`ingredients`);

export const getIdOrderFromServer = (array: TIds): Promise<any> => {
	return request(`orders`, {
		method: "POST",
		headers: config.headers,
		body: JSON.stringify(array),
	});
};

export const createRegistrationOnServer = (object: TValue): Promise<any> => {
	return request("auth/register", {
		method: "POST",
		headers: config.headers,
		body: JSON.stringify(object),
	});
};

export const getAuthorizationOnServer = (object: TValue): Promise<any> => {
	return request(`auth/login`, {
		method: "POST",
		headers: config.headers,
		body: JSON.stringify(object),
	});
};

export const getResetPasswordOnServer = (object: TValue): Promise<any> => {
	return request(`password-reset`, {
		method: "POST",
		headers: config.headers,
		body: JSON.stringify(object),
	});
};

export const setNewPasswordOnServer = (object: TValue): Promise<any> => {
	return request(`password-reset/reset`, {
		method: "POST",
		headers: config.headers,
		body: JSON.stringify(object),
	});
};

export const getRefreshTokenOnServer = (): Promise<any> => {
	console.log("run api getRefreshTokenOnServer");
	return request(`auth/token`, {
		method: "POST",
		headers: config.headers,
		body: JSON.stringify({
			token: getCookie("refreshToken"),
		}),
	});
};

export const getUserInfoOnServer = (): Promise<any> => {
	return request(`auth/user`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
			Authorization: getCookie("accessToken"),
		},
	});
};

export const setLogOutOnServer = (): Promise<any> => {
	return request(`auth/logout`, {
		method: "POST",
		headers: config.headers,
		body: JSON.stringify({
			token: getCookie("refreshToken"),
		}),
	});
};

export const putchUpdateUserInfoOnServer = (object: TValue): Promise<any> => {
	return request(`auth/user`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
			Authorization: getCookie("accessToken"),
		},
		body: JSON.stringify(object),
	});
};
