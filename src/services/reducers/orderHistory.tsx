import {
	ORDER_HISTORY_CLOSED,
	ORDER_HISTORY_CLOSED_BY_USER,
	ORDER_HISTORY_ERROR,
	ORDER_HISTORY_GET_MESSAGE,
	ORDER_HISTORY_SUCCESS,
	TOrderHistoryActions,
} from "../actions/orderHistory";
import { TFeed } from "../utile/types";

export type TOrderHistory = {
	wsConnected: boolean;
	messages: TFeed[];

	error?: Event;
};

const initialState: TOrderHistory = {
	wsConnected: false,
	messages: [],
};

export const orderHistoryReducer = (
	state = initialState,
	action: TOrderHistoryActions
) => {
	switch (action.type) {
		case ORDER_HISTORY_SUCCESS:
			return {
				...state,
				error: undefined,
				wsConnected: true,
			};
		case ORDER_HISTORY_ERROR:
			return {
				...state,
				wsConnected: false,
				error: action.payload,
			};

		case ORDER_HISTORY_CLOSED_BY_USER:
			return {
				...state,
				wsConnected: false,
				error: undefined,
			};

		case ORDER_HISTORY_CLOSED:
			return {
				...state,
				wsConnected: false,
				error: undefined,
			};
		case ORDER_HISTORY_GET_MESSAGE:
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
