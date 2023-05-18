import { getCookie } from "./utile/utile";

const config = {
	BASE_URL: "https://norma.nomoreparties.space/api/",
	headers: { "Content-Type": "application/json; charset=UTF-8" },
};

async function checkResponse(response) {
	if (response.ok) {
		return response.json();
	} else {
		return Promise.reject(`Ошибка ${response.status}`);
	}
}

const checkSuccess = (res) => {
	if (res && res.success) {
		return res;
	}
	return Promise.reject(`Ответ не success: ${res}`);
};

const request = (endpoint, options) => {
	return fetch(`${config.BASE_URL}${endpoint}`, options)
		.then(checkResponse)
		.then(checkSuccess);
};

export const getBurgerIngredientsFromServer = () => request(`ingredients`);

export const getIdOrderFromServer = (array) =>
	request(`orders`, {
		method: "POST",
		headers: config.headers,
		body: JSON.stringify(array),
	});

export const createRegistrationOnServer = (object) => {
	return request("auth/register", {
		method: "POST",
		headers: config.headers,
		body: JSON.stringify(object),
	});
};

export const getAuthorizationOnServer = (object) =>
	request(`auth/login`, {
		method: "POST",
		headers: config.headers,
		body: JSON.stringify(object),
	});

export const getResetPasswordOnServer = (object) =>
	request(`password-reset`, {
		method: "POST",
		headers: config.headers,
		body: JSON.stringify(object),
	});

export const setNewPasswordOnServer = (object) =>
	request(`password-reset/reset`, {
		method: "POST",
		headers: config.headers,
		body: JSON.stringify(object),
	});

export const getRefreshTokenOnServer = () =>
	request(`auth/token`, {
		method: "POST",
		headers: config.headers,
		body: JSON.stringify({
			token: getCookie("refreshToken"),
		}),
	});

export const getUserInfoOnServer = () =>
	request(`auth/user`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
			Authorization: getCookie("accessToken"),
		},
	});

export const setLogOutOnServer = () =>
	request(`auth/logout`, {
		method: "POST",
		headers: config.headers,
		body: JSON.stringify({
			token: getCookie("refreshToken"),
		}),
	});

export const putchUpdateUserInfoOnServer = (object) => {
	console.log(1, object);
	request(`auth/user`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
			Authorization: getCookie("accessToken"),
		},
		body: JSON.stringify(object),
	});
};
