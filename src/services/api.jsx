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

// export async function getBurgerIngredientsFromServer() {
// 	const req = await fetch(`${config.BASE_URL}/ingredients`);
// 	const response = await checkResponse(req);
// 	return response;
// }

// export async function getIdOrderFromServer(array) {
// 	const req = await fetch(`${config.BASE_URL}/orders`, {
// 		method: "POST",
// 		headers: config.headers,
// 		body: JSON.stringify(array),
// 	});
// 	const response = await checkResponse(req);
// 	return response;
// }
