import {
	ORDER_PROFILE_CLOSED,
	ORDER_PROFILE_CLOSED_BY_USER,
	ORDER_PROFILE_ERROR,
	ORDER_PROFILE_GET_MESSAGE,
	ORDER_PROFILE_SUCCESS,
	TOrdersInProfileActions,
} from "../actions/orderProfile";

export type TWsOrdersInProfile = {
	wsConnected: boolean;
	messages: [];

	error?: Event;
};

const initialState: TWsOrdersInProfile = {
	wsConnected: false,
	messages: [],
};

export const orderInProfileReducer = (
	state = initialState,
	action: TOrdersInProfileActions
) => {
	switch (action.type) {
		case ORDER_PROFILE_SUCCESS:
			return {
				...state,
				error: undefined,
				wsConnected: true,
			};
		case ORDER_PROFILE_ERROR:
			return {
				...state,
				wsConnected: false,
				error: action.payload,
			};

		case ORDER_PROFILE_CLOSED_BY_USER:
			return {
				...state,
				wsConnected: false,
				error: undefined,
			};

		case ORDER_PROFILE_CLOSED:
			return {
				...state,
				wsConnected: false,
				error: undefined,
			};
		case ORDER_PROFILE_GET_MESSAGE:
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
