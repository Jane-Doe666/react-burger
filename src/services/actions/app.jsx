import { getBurgerIngredientsFromServer } from "../api";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const GET_INGREDIENTS_REQUEST = "GETGET_INGREDIENTS__REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_ERROR = "GET_INGREDIENTS_ERROR";

export const closeModal = (payload) => ({
	type: CLOSE_MODAL,
	payload: payload,
});

export function getIngredients() {
	return function (dispatch) {
		dispatch({
			type: GET_INGREDIENTS_REQUEST,
		});
		getBurgerIngredientsFromServer().then((res) => {
			if (res && res.success) {
				dispatch({
					type: GET_INGREDIENTS_SUCCESS,
					items: res.data,
				});
			} else {
				dispatch({
					type: GET_INGREDIENTS_ERROR,
				});
			}
		});
	};
}
