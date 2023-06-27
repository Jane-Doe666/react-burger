import type { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "../utile/typesRedux";

export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
	"WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
	"WS_CONNECTION_CLOSED";
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

export type TWsOrderActions =
	| TWsConnectionStart
	| TWsConnectionSuccess
	| TWsConnectionError
	| TWsConnectionClosed
	| TWsConnectionGetMessage
	| TWsConnectionSendMessage;

// socketMiddleware.ts

export const socketMiddlewareOrders = (wsApiOrderUrl: string): Middleware => {
	return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;

		return (next) => (action: TWsOrderActions) => {
			const { dispatch } = store;
			const { type } = action;

			if (type === "WS_CONNECTION_START") {
				// объект класса WebSocket
				socket = new WebSocket(wsApiOrderUrl);
			}
			if (socket) {
				// функция, которая вызывается при открытии сокета
				socket.onopen = (event) => {
					dispatch({ type: "WS_CONNECTION_SUCCESS", payload: event });
				};

				// функция, которая вызывается при ошибке соединения
				socket.onerror = (event) => {
					dispatch({ type: "WS_CONNECTION_ERROR", payload: event });
				};

				// функция, которая вызывается при получения события от сервера
				socket.onmessage = (event) => {
					const { data } = event;
					const orders = JSON.parse(data);

					dispatch({ type: "WS_GET_MESSAGE", payload: orders });
				};
				// функция, которая вызывается при закрытии соединения
				socket.onclose = (event) => {
					dispatch({ type: "WS_CONNECTION_CLOSED", payload: event });
				};

				if (type === "WS_SEND_MESSAGE") {
					const message = action.payload;
					// функция для отправки сообщения на сервер
					socket.send(JSON.stringify(message));
				}
			}

			next(action);
		};
	}) as Middleware;
};
