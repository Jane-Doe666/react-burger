import type { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "../utile/typesRedux";

export type TWsActions = {
	start: string;
	success: string;
	close_by_user: string;
	error: string;
	close: string;
	message: string;
};

export const socketMiddlewareOrders = (
	webSocketActions: TWsActions,
	url: string
): Middleware => {
	return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;

		return (next) => (action) => {
			const { dispatch } = store;
			const { type } = action;

			if (type === webSocketActions.start) {
				socket = new WebSocket(url);
			}

			if (socket) {
				socket.onopen = (event) => {
					dispatch({ type: webSocketActions.success, payload: event });
				};

				socket.onerror = (event) => {
					dispatch({ type: webSocketActions.error, payload: event });
				};

				socket.onmessage = (event) => {
					const { data } = event;
					const orders = JSON.parse(data);
					dispatch({ type: webSocketActions.message, payload: orders });
				};

				socket.onclose = (event) => {
					dispatch({ type: webSocketActions.close, payload: event });
				};

				if (action.type === webSocketActions.close_by_user) {
					socket.close(1000);
				}
			}

			next(action);
		};
	}) as Middleware;
};
