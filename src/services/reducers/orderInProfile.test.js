import * as types from "../actions/orderProfile";
import { getMessageTest } from "../utile/codeTest";
import { orderInProfileReducer, initialState } from "./orderInProfile";

describe("orderInProfileReducer reducer", () => {
	it("initial state control", () => {
		expect(orderInProfileReducer(undefined, {})).toEqual(initialState);
	});

	it("run ORDER_PROFILE_SUCCESS", () => {
		expect(
			orderInProfileReducer(initialState, {
				type: types.ORDER_PROFILE_SUCCESS,
				error: undefined,
				wsConnected: true,
			})
		).toEqual({
			...initialState,
			error: undefined,
			wsConnected: true,
		});
	});

	it("run ORDER_PROFILE_CLOSED_BY_USER", () => {
		expect(
			orderInProfileReducer(initialState, {
				type: types.ORDER_PROFILE_CLOSED_BY_USER,
				wsConnected: false,
				error: undefined,
			})
		).toEqual({
			...initialState,
			wsConnected: false,
			error: undefined,
		});
	});

	it("run ORDER_PROFILE_CLOSED", () => {
		expect(
			orderInProfileReducer(initialState, {
				type: types.ORDER_PROFILE_CLOSED,
				wsConnected: false,
				error: undefined,
			})
		).toEqual({
			...initialState,
			wsConnected: false,
			error: undefined,
		});
	});

	it("run ORDER_PROFILE_GET_MESSAGE", () => {
		expect(
			orderInProfileReducer(
				{
					wsConnected: true,
					messages: null,
					error: undefined,
				},
				{
					type: types.ORDER_PROFILE_GET_MESSAGE,
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
