import { getBurgerIngredientsFromServer } from "../api";
export const CLOSE_MODAL = "APP/CLOSE_MODAL";
export const GET_INGREDIENTS_REQUEST = "APP/GETGET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "APP/GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_ERROR = "APP/GET_INGREDIENTS_ERROR";

export const closeModal = (payload) => ({
	type: CLOSE_MODAL,
	payload: payload,
});

export function getIngredients() {
	return function (dispatch) {
		dispatch({
			type: GET_INGREDIENTS_REQUEST,
		});
		getBurgerIngredientsFromServer()
			.then((res) => {
				dispatch({
					type: GET_INGREDIENTS_SUCCESS,
					items: res.data,
				});
			})
			.catch((err) => {
				console.error(`Ошибка: ${err}`);
				dispatch({
					type: GET_INGREDIENTS_ERROR,
				});
			});
	};
}
