import type { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "../utile/typesRedux";
import { getCookie } from "../utile/utile";
import { IOrderHistoryStart, IOrderHistoryClosedByUser } from "./orderHistory";
import { IOrderProfileStart, IOrderProfileClosedByUser } from "./orderProfile";

export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
	"WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
	"WS_CONNECTION_CLOSED";
export const WS_CONNECTION_CLOSED_BY_USER: "WS_CONNECTION_CLOSED_BY_USER" =
	"WS_CONNECTION_CLOSED_BY_USER";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";
export const WS_SEND_MESSAGE: "WS_SEND_MESSAGE" = "WS_SEND_MESSAGE";

export type TWsConnectionStart = {
	type: typeof WS_CONNECTION_START;
	payload: string;
};

export type TWsConnectionSuccess = {
	type: typeof WS_CONNECTION_SUCCESS;
};

export type TWsConnectionError = {
	type: typeof WS_CONNECTION_ERROR;
	payload: string;
};

export type TWsConnectionClosed = {
	type: typeof WS_CONNECTION_CLOSED;
};

export type TWsConnectionGetMessage = {
	type: typeof WS_GET_MESSAGE;
	payload: string;
};

export type TWsConnectionSendMessage = {
	type: typeof WS_SEND_MESSAGE;
	payload: string;
};

export type TWsConnectionClosedByUser = {
	type: typeof WS_CONNECTION_CLOSED_BY_USER;
	payload: string;
};

export type TWsOrderActions =
	| IOrderHistoryStart
	| IOrderProfileStart
	| TWsConnectionSuccess
	| TWsConnectionError
	| TWsConnectionClosed
	| TWsConnectionGetMessage
	| TWsConnectionSendMessage
	| TWsConnectionClosedByUser
	| IOrderHistoryClosedByUser
	| IOrderProfileClosedByUser;

// socketMiddleware.ts

export const socketMiddlewareOrders = (wsApiOrderUrl: string): Middleware => {
	return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;

		return (next) => (action: TWsOrderActions) => {
			const { dispatch } = store;
			const { type } = action;

			// объект класса WebSocket for ORDERR Profile
			if (type === "ORDER_HISTORY_START") {
				socket = new WebSocket(`${wsApiOrderUrl}/all`);
			}

			// объект класса for ORDERR HIstory
			if (type === "ORDER_PROFILE_START") {
				socket = new WebSocket(`${wsApiOrderUrl}?token=${getCookie("token")}`);
			}
			if (socket) {
				socket.onopen = (event) => {
					dispatch({ type: "WS_CONNECTION_SUCCESS", payload: event });
				};

				socket.onerror = (event) => {
					dispatch({ type: "WS_CONNECTION_ERROR", payload: event });
				};

				socket.onmessage = (event) => {
					const { data } = event;
					const orders = JSON.parse(data);
					dispatch({ type: "WS_GET_MESSAGE", payload: orders });
				};

				socket.onclose = (event) => {
					dispatch({ type: "WS_CONNECTION_CLOSED", payload: event });
				};

				if (action.type === "ORDER_HISTORY_CLOSED_BY_USER") {
					socket.close(1000);
				}

				if (action.type === "ORDER_PROFILE_CLOSED_BY_USER") {
					socket.close(1000);
				}

				if (type === "WS_SEND_MESSAGE") {
					const message = action.payload;
					socket.send(JSON.stringify(message));
				}
			}

			next(action);
		};
	}) as Middleware;
};
