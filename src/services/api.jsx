const burgerURL = "https://norma.nomoreparties.space/api/ingredients";

export async function getBurgerIngredients() {
	const response = await fetch(burgerURL);

	if (response.ok) {
		let json = await response.json();
		return json.data;
	} else {
		console.log("Ошибка HTTP: " + response.status);
		throw new Error("error");
	}
}
