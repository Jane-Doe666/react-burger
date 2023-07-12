import * as types from "../actions/app";
import { testArray } from "../utile/codeTest.jsx";
import { burgerIngredientsReducer, initialState } from "./app";

describe("app reducer", () => {
	it("initial state control", () => {
		expect(burgerIngredientsReducer(undefined, {})).toEqual(initialState);
	});

	it("run GET_INGREDIENTS_REQUEST", () => {
		expect(
			burgerIngredientsReducer(initialState, {
				type: types.GET_INGREDIENTS_REQUEST,
			})
		).toEqual({
			...initialState,
			itemsRequest: true,
		});
	});

	it("run GET_INGREDIENTS_SUCCESS", () => {
		expect(
			burgerIngredientsReducer(initialState, {
				type: types.GET_INGREDIENTS_SUCCESS,
				itemsFailed: false,
				items: testArray,
				itemsRequest: false,
				isLoading: false,
			})
		).toEqual({
			...initialState,
			itemsFailed: false,
			items: testArray,
			itemsRequest: false,
			isLoading: false,
		});
	});
});
