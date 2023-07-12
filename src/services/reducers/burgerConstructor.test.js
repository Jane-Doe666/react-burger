import * as types from "../actions/burgerConstructor";
import {
	bunTest,
	testArray,
	testArrayDelete,
	mainTest1,
} from "../utile/codeTest.jsx";
import { burgerConstructorReducer, initialState } from "./burgerConstructor";

describe("burgerConstructorReducer reducer", () => {
	it("initial state control", () => {
		expect(burgerConstructorReducer(undefined, {})).toEqual(initialState);
	});

	it("run CLEAR_CONSTRUCTOR", () => {
		expect(
			burgerConstructorReducer(initialState, {
				type: types.CLEAR_CONSTRUCTOR,
				list: [],
				bunBottom: null,
				bunTop: null,
			})
		).toEqual({
			...initialState,
			list: [],
			bunBottom: null,
			bunTop: null,
		});
	});

	it("run CHANGE_ORDER", () => {
		expect(
			burgerConstructorReducer(initialState, {
				type: types.CHANGE_ORDER,
				payload: testArray,
			})
		).toEqual({
			...initialState,
			list: testArray,
		});
	});

	it("run DELETE", () => {
		expect(
			burgerConstructorReducer(
				{
					bunBottom: null,
					bunTop: null,
					indexDragOrder: null,
					list: testArrayDelete,
				},
				{
					type: types.DELETE,
					payload: mainTest1,
				}
			)
		).toEqual({
			bunBottom: null,
			bunTop: null,
			indexDragOrder: null,
			list: testArrayDelete.filter((item) => item.newId !== mainTest1.newId),
		});
	});
});
