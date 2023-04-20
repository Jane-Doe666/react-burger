const config = {
	burgerURL: "https://norma.nomoreparties.space/api/ingredients",
	orderURL: "https://norma.nomoreparties.space/api/orders",
	headers: { "Content-Type": "application/json; charset=UTF-8" },
};

async function checkResponse(response) {
	if (response.ok) {
		let json = await response.json();
		return json;
	} else {
		console.log("Ошибка HTTP: " + response.status);
		throw new Error("error");
	}
}

export async function getBurgerIngredientsFromServer() {
	const req = await fetch(config.burgerURL);
	const response = await checkResponse(req);
	return response;
}

export async function getIdOrderFromServer(array) {
	const req = await fetch(config.orderURL, {
		method: "POST",
		headers: config.headers,
		body: JSON.stringify(array),
	});
	const response = await checkResponse(req);
	return response;
}
