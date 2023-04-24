import { v4 as uuidv4 } from "uuid";
import { getIdOrderFromServer } from "../api";
import { openOrder } from "./orderDetails";

export const ADD = "BURGER_CONSTRUCTOR/ADD";
export const DELETE = "BURGER_CONSTRUCTOR/DELETE";
export const CHANGE_ORDER = "BURGER_CONSTRUCTOR/CHANGE_ORDER";

export const addIngredientToConstructor = (payload) => ({
	type: ADD,
	payload: payload,
});

export const deleteIngredientFromConstructor = (payload) => ({
	type: DELETE,
	payload: payload,
});

export const changeOrderInConstructor = (payload) => ({
	type: CHANGE_ORDER,
	payload: payload,
});

export function pushIngredientToConstructor(id) {
	return function (dispatch, getstate) {
		const currentState = getstate();
		const pushElement = currentState.app.data.find((item) => item._id === id);
		pushElement.newId = uuidv4();
		pushElement.key = pushElement.newId;

		dispatch(addIngredientToConstructor(pushElement));
	};
}

export function sendIdIngredientsOnServer(array) {
	return async function (dispatch) {
		const data = await getIdOrderFromServer(array);
		dispatch(openOrder(data));
	};
}
