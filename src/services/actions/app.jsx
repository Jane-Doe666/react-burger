import { getBurgerIngredientsFromServer } from "../api";
import {
	updateDataInBurgerIngredients,
	UPDATE_DATA,
} from "./burgerIngredients";

export const CLOSE_MODAL = "CLOSE_MODAL";

export const closeModal = (payload) => ({
	type: CLOSE_MODAL,
	payload: payload,
});

export function getDataIngredients() {
	return async function (dispatch) {
		const data = await getBurgerIngredientsFromServer();
		await dispatch(updateDataInBurgerIngredients(data.data));
	};
}
