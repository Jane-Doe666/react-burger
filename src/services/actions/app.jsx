import { getBurgerIngredients } from "../api";
import { UPDATE_DATA } from "../reducers/burgerIngredients";

export function getDataIngredients() {
	return async function (dispatch) {
		const data = await getBurgerIngredients();
		dispatch({ type: UPDATE_DATA, value: data });
	};
}
