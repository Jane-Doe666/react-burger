import { getBurgerIngredientsFromServer } from "../api";
import { TElement, TIngredients } from "../utile/types";
import { AppThunk } from "../utile/typesRedux";

export const CLOSE_MODAL: "APP/CLOSE_MODAL" = "APP/CLOSE_MODAL";
export const GET_INGREDIENTS_REQUEST: "APP/GETGET_INGREDIENTS_REQUEST" =
	"APP/GETGET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "APP/GET_INGREDIENTS_SUCCESS" =
	"APP/GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_ERROR: "APP/GET_INGREDIENTS_ERROR" =
	"APP/GET_INGREDIENTS_ERROR";

export interface ICloseModal {
	readonly type: typeof CLOSE_MODAL;
}

export interface IGetIngredientsRequest {
	readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccess {
	readonly type: typeof GET_INGREDIENTS_SUCCESS;
	items: TElement[];
}

export interface IGetIngredientsError {
	readonly type: typeof GET_INGREDIENTS_ERROR;
}

export type TGetIngredientsActions =
	| ICloseModal
	| IGetIngredientsRequest
	| IGetIngredientsSuccess
	| IGetIngredientsError;

export const closeModal = () => ({
	type: CLOSE_MODAL,
});

export const getIngredients = () => {
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
};
