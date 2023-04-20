import { getBurgerIngredientsFromServer, getIdOrderFromServer } from "../api";
import { ADD } from "../reducers/burgerConstructor";
import { UPDATE_DATA } from "../reducers/burgerIngredients";
import { v4 as uuidv4 } from "uuid";
import { OPEN_ORDER } from "../reducers/orderDetails";

export const CLOSE_MODAL = "ACTIONS/CLOSE_MODAL";

export function getDataIngredients() {
	return async function (dispatch) {
		const data = await getBurgerIngredientsFromServer();
		dispatch({ type: UPDATE_DATA, value: data.data });
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

export function sendIdIngredientsOnServer(array) {
	console.log(1, array);
	return async function (dispatch) {
		const data = await getIdOrderFromServer(array);
		console.log(88, data);

		dispatch({ type: OPEN_ORDER, payload: data }); // change data
	};
}
