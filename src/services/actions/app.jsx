import { getBurgerIngredients } from "../api";
import { ADD, DELETE } from "../reducers/burgerConstructor";
import { UPDATE_DATA } from "../reducers/burgerIngredients";
import { v4 as uuidv4 } from "uuid";

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
		pushElement.newId = uuidv4();
		pushElement.key = pushElement.newId;
		dispatch({ type: ADD, payload: pushElement });
	};
}
