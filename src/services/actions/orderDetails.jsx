import { getIdOrderFromServer } from "../api";
import { CLEAR_CONSTRUCTOR } from "./burgerConstructor";

export const OPEN_ORDER = "ORDER_DETAILS/OPEN_ORDER";
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_ERROR = "GET_ORDER_ERROR";

export function getOrder(idList) {
	return function (dispatch) {
		dispatch({
			type: GET_ORDER_REQUEST,
		});
		getIdOrderFromServer(idList)
			.then((res) => {
				if (res && res.success) {
					dispatch({
						type: GET_ORDER_SUCCESS,
						items: res.order.number,
					});
					dispatch({
						type: CLEAR_CONSTRUCTOR,
					});
				} else {
					dispatch({
						type: GET_ORDER_ERROR,
					});
				}
			})
			.catch((err) => {
				console.error(`Ошибка: ${err}`);
			});
	};
}
