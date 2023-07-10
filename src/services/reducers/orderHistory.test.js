import * as types from "../actions/orderHistory";
import { getMessageTest } from "../utile/codeTest";
import { orderHistoryReducer, initialState } from "./orderHistory";

describe("orderHistoryReducer reducer", () => {
	it("initial state control", () => {
		expect(orderHistoryReducer(undefined, {})).toEqual(initialState);
	});

	it("run ORDER_HISTORY_SUCCESS", () => {
		expect(
			orderHistoryReducer(initialState, {
				type: types.ORDER_HISTORY_SUCCESS,
				error: undefined,
				wsConnected: true,
			})
		).toEqual({
			...initialState,
			error: undefined,
			wsConnected: true,
		});
	});

	it("run ORDER_HISTORY_CLOSED_BY_USER", () => {
		expect(
			orderHistoryReducer(initialState, {
				type: types.ORDER_HISTORY_CLOSED_BY_USER,
				wsConnected: false,
				error: undefined,
			})
		).toEqual({
			...initialState,
			wsConnected: false,
			error: undefined,
		});
	});

	it("run ORDER_HISTORY_CLOSED", () => {
		expect(
			orderHistoryReducer(initialState, {
				type: types.ORDER_HISTORY_CLOSED,
				wsConnected: false,
				error: undefined,
			})
		).toEqual({
			...initialState,
			wsConnected: false,
			error: undefined,
		});
	});

	it("run ORDER_HISTORY_GET_MESSAGE", () => {
		expect(
			orderHistoryReducer(
				{
					wsConnected: true,
					messages: null,
					error: undefined,
				},
				{
					type: types.ORDER_HISTORY_GET_MESSAGE,
					payload: getMessageTest,
				}
			)
		).toEqual({
			...initialState,
			wsConnected: true,
			error: undefined,
			messages: getMessageTest,
		});
	});
});
