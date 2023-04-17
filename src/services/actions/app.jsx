import { getBurgerIngredients } from "../api";
import { ADD } from "../reducers/burgerConstructor";
import { UPDATE_DATA } from "../reducers/burgerIngredients";

export function getDataIngredients() {
	return async function (dispatch) {
		const data = await getBurgerIngredients();
		dispatch({ type: UPDATE_DATA, value: data });
	};
}

export function pushIngredientToConstructor(id) {
	return function (dispatch, getstate) {
		const currentState = getstate();
		const pushElement = currentState.app.data.find((item) => item._id === id);
		pushElement.newID = Math.random();
		dispatch({ type: ADD, payload: pushElement });
	};
}
