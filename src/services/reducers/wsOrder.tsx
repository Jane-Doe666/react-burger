import {
	WS_CONNECTION_SUCCESS,
	WS_CONNECTION_ERROR,
	WS_CONNECTION_START,
	WS_CONNECTION_CLOSED,
	WS_GET_MESSAGE,
	WS_SEND_MESSAGE,
	TWsOrderActions,
} from "../actions/socketMiddlewareOrders";

export type TWOrders = {
	wsConnected: boolean;
	messages: [];

	error?: Event;
};

const initialState: TWOrders = {
	wsConnected: false,
	messages: [],
};

export const wsReducerOrders = (
	state = initialState,
	action: TWsOrderActions
) => {
	switch (action.type) {
		case WS_CONNECTION_SUCCESS:
			return {
				...state,
				error: undefined,
				wsConnected: true,
			};
		case WS_CONNECTION_ERROR:
			return {
				...state,
				wsConnected: false,
				error: action.payload,
			};

		case WS_CONNECTION_CLOSED:
			return {
				...state,
				wsConnected: false,
				error: undefined,
			};
		case WS_GET_MESSAGE:
			return {
				...state,
				wsConnected: true,
				error: undefined,
				messages: action.payload,
			};
		default:
			return state;
	}
};
