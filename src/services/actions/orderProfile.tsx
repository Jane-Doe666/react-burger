import { TWsMessage } from "../types/types";
import { TWsActions } from "./socketMiddlewareOrders";

export const ORDER_PROFILE_START: "ORDER_PROFILE_START" = "ORDER_PROFILE_START";
export const ORDER_PROFILE_SUCCESS: "ORDER_PROFILE_SUCCESS" =
	"ORDER_PROFILE_SUCCESS";
export const ORDER_PROFILE_ERROR: "ORDER_PROFILE_ERROR" = "ORDER_PROFILE_ERROR";
export const ORDER_PROFILE_CLOSED: "ORDER_PROFILE_CLOSED" =
	"ORDER_PROFILE_CLOSED";
export const ORDER_PROFILE_CLOSED_BY_USER: "ORDER_PROFILE_CLOSED_BY_USER" =
	"ORDER_PROFILE_CLOSED_BY_USER";
export const ORDER_PROFILE_GET_MESSAGE: "ORDER_PROFILE_GET_MESSAGE" =
	"ORDER_PROFILE_GET_MESSAGE";
export const ORDER_PROFILE_SEND_MESSAGE: "ORDER_PROFILE_SEND_MESSAGE" =
	"ORDER_PROFILE_SEND_MESSAGE";

export interface IOrderProfileStart {
	readonly type: typeof ORDER_PROFILE_START;
	readonly payload: string;
}

export interface IOrderProfileClosedByUser {
	readonly type: typeof ORDER_PROFILE_CLOSED_BY_USER;
}

export interface IOrderProfileSuccess {
	readonly type: typeof ORDER_PROFILE_SUCCESS;
	readonly payload: Event;
}

export interface IOrderProfileError {
	readonly type: typeof ORDER_PROFILE_ERROR;
	readonly payload: Event;
}

export interface IOrderProfileClosed {
	readonly type: typeof ORDER_PROFILE_CLOSED;
	readonly payload: Event;
}

export interface IOrderProfileGetMessage {
	readonly type: typeof ORDER_PROFILE_GET_MESSAGE;
	readonly payload: TWsMessage;
}

export const orderProfileStart = () => {
	return {
		type: ORDER_PROFILE_START,
	};
};

export const orderProfileClosed = () => {
	return {
		type: ORDER_PROFILE_CLOSED_BY_USER,
	};
};

export type TOrdersInProfileActions =
	| IOrderProfileStart
	| IOrderProfileClosedByUser
	| IOrderProfileSuccess
	| IOrderProfileError
	| IOrderProfileClosed
	| IOrderProfileGetMessage;

export const orderProfileActions = {
	start: ORDER_PROFILE_START,
	success: ORDER_PROFILE_SUCCESS,
	close: ORDER_PROFILE_CLOSED,
	error: ORDER_PROFILE_ERROR,
	close_by_user: ORDER_PROFILE_CLOSED_BY_USER,
	message: ORDER_PROFILE_GET_MESSAGE,
};
