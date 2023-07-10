import * as types from "../actions/orderDetails";
import { testArray } from "../utile/codeTest.jsx";
import { orderDetailsReducer, initialState } from "./orderDetails";

describe("orderDetailsReducer reducer", () => {
	it("initial state control", () => {
		expect(orderDetailsReducer(undefined, {})).toEqual(initialState);
	});

	it("run GET_ORDER_REQUEST", () => {
		expect(
			orderDetailsReducer(initialState, {
				type: types.GET_ORDER_REQUEST,
				itemsRequest: true,
				isLoader: true,
			})
		).toEqual({
			...initialState,
			itemsRequest: true,
			isLoader: true,
		});
	});

	it("run GET_ORDER_SUCCESS", () => {
		expect(
			orderDetailsReducer(initialState, {
				type: types.GET_ORDER_SUCCESS,
				itemsFailed: false,
				items: testArray,
				itemsRequest: false,
				isModal: true,
				isLoader: false,
			})
		).toEqual({
			...initialState,
			itemsFailed: false,
			items: testArray,
			itemsRequest: false,
			isModal: true,
			isLoader: false,
		});
	});
});
