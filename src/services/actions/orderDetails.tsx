import { getIdOrderFromServer, getRefreshTokenOnServer } from "../api";
import { TElement, TIds } from "../utile/types";
import { setCookie } from "../utile/utile";
import { ICloseModal } from "./app";
import { CLEAR_CONSTRUCTOR } from "./burgerConstructor";
import { REFRESH_TOKEN } from "./refreshToken";

export const GET_ORDER_REQUEST: "ORDER_DETAILS/GET_ORDER_REQUEST" =
	"ORDER_DETAILS/GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS: "ORDER_DETAILS/GET_ORDER_SUCCESS" =
	"ORDER_DETAILS/GET_ORDER_SUCCESS";
export const GET_ORDER_ERROR: "ORDER_DETAILS/GET_ORDER_ERROR" =
	"ORDER_DETAILS/GET_ORDER_ERROR";

export interface IGetOrderRequest {
	type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccess {
	type: typeof GET_ORDER_SUCCESS;
	items: TElement[];
}

export interface IGetOrderError {
	type: typeof GET_ORDER_ERROR;
}

export type TOrderDetailsActions =
	| IGetOrderRequest
	| IGetOrderSuccess
	| IGetOrderError
	| ICloseModal;

export const getOrder = (idList: TIds) => {
	return function (dispatch) {
		dispatch({
			type: GET_ORDER_REQUEST,
		});
		getRefreshTokenOnServer()
			.then((data) => {
				setCookie("refreshToken", data.refreshToken, {});
				setCookie("accessToken", data.accessToken, {
					"max-age": 1200000,
				});

				dispatch({ type: REFRESH_TOKEN, payload: data });
			})
			.then(
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
					})
			)
			.catch((err) => console.log(err));
	};
};
