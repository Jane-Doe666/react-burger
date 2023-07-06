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
	TWsActions: TWsActions,
	url: string
): Middleware => {
	return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;

		return (next) => (action) => {
			const { dispatch } = store;
			const { type } = action;

			if (type === TWsActions.start) {
				socket = new WebSocket(url);
			}

			if (socket) {
				socket.onopen = (event) => {
					dispatch({ type: TWsActions.success, payload: event });
				};

				socket.onerror = (event) => {
					dispatch({ type: TWsActions.error, payload: event });
				};

				socket.onmessage = (event) => {
					const { data } = event;
					const orders = JSON.parse(data);
					dispatch({ type: TWsActions.message, payload: orders });
				};

				socket.onclose = (event) => {
					dispatch({ type: TWsActions.close, payload: event });
				};

				if (action.type === TWsActions.close_by_user) {
					socket.close(1000);
				}
			}

			next(action);
		};
	}) as Middleware;
};
