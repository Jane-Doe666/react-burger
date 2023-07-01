export const ORDER_HISTORY_START: "ORDER_HISTORY_START" = "ORDER_HISTORY_START";
export const ORDER_HISTORY_SUCCESS: "ORDER_HISTORY_SUCCESS" =
	"ORDER_HISTORY_SUCCESS";
export const ORDER_HISTORY_ERROR: "ORDER_HISTORY_ERROR" = "ORDER_HISTORY_ERROR";
export const ORDER_HISTORY_CLOSED: "ORDER_HISTORY_CLOSED" =
	"ORDER_HISTORY_CLOSED";
export const ORDER_HISTORY_CLOSED_BY_USER: "ORDER_HISTORY_CLOSED_BY_USER" =
	"ORDER_HISTORY_CLOSED_BY_USER";
export const ORDER_HISTORY_GET_MESSAGE: "ORDER_HISTORY_GET_MESSAGE" =
	"ORDER_HISTORY_GET_MESSAGE";

export interface IOrderHistoryStart {
	readonly type: typeof ORDER_HISTORY_START;
	readonly payload: string;
}

export interface IOrderHistoryClosedByUser {
	readonly type: typeof ORDER_HISTORY_CLOSED_BY_USER;
}
export interface IOrderHistorySuccess {
	readonly type: typeof ORDER_HISTORY_SUCCESS;
	readonly payload: Event;
}

export interface IOrderHistoryError {
	readonly type: typeof ORDER_HISTORY_ERROR;
	readonly payload: Event;
}

export interface IOrderHistoryClosed {
	readonly type: typeof ORDER_HISTORY_CLOSED;
	readonly payload: Event;
}

export interface IOrderHistoryGetMessage {
	readonly type: typeof ORDER_HISTORY_GET_MESSAGE;
	readonly payload: any;
}

export const orderHistoryStart = (Url: string) => {
	return {
		type: ORDER_HISTORY_START,
		payload: Url,
	};
};

export const orderHistoryClosedByUser = () => {
	return {
		type: ORDER_HISTORY_CLOSED_BY_USER,
	};
};

export type TOrderHistoryActions =
	| IOrderHistoryStart
	| IOrderHistoryClosedByUser
	| IOrderHistorySuccess
	| IOrderHistoryError
	| IOrderHistoryClosed
	| IOrderHistoryGetMessage;
