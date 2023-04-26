import { getIdOrderFromServer } from "../api";
import { CLEAR_CONSTRUCTOR } from "./burgerConstructor";

export const OPEN_ORDER = "ORDER_DETAILS/OPEN_ORDER";
export const GET_ORDER_REQUEST = "ORDER_DETAILS/GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "ORDER_DETAILS/GET_ORDER_SUCCESS";
export const GET_ORDER_ERROR = "ORDER_DETAILS/GET_ORDER_ERROR";

export function getOrder(idList) {
	return function (dispatch) {
		dispatch({
			type: GET_ORDER_REQUEST,
		});
		getIdOrderFromServer(idList)
			.then((res) => {
				dispatch({
					type: GET_ORDER_SUCCESS,
					items: res.order.number,
				});
				dispatch({
					type: CLEAR_CONSTRUCTOR,
				});
			})
			.catch((err) => {
				console.error(`Ошибка: ${err}`);
				dispatch({
					type: GET_ORDER_ERROR,
				});
			});
	};
}
