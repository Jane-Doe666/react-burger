import { CLOSE_MODAL } from "../actions/app";
import {
	GET_ORDER_REQUEST,
	GET_ORDER_SUCCESS,
	GET_ORDER_ERROR,
} from "../actions/orderDetails";

const initialState = {
	isModal: false,
	items: [],
	itemsRequest: false,
	itemsFailed: false,
	isLoader: false,
};

export const orderDetailsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ORDER_REQUEST: {
			return {
				...state,
				itemsRequest: true,
				isLoader: true,
			};
		}
		case GET_ORDER_SUCCESS: {
			return {
				...state,
				itemsFailed: false,
				items: action.items,
				itemsRequest: false,
				isModal: true,
				isLoader: false,
			};
		}
		case GET_ORDER_ERROR: {
			return {
				...state,
				itemsFailed: true,
				itemsRequest: false,
				isLoader: false,
			};
		}
		case CLOSE_MODAL: {
			return {
				...state,
				isModal: false,
			};
		}

		default: {
			return state;
		}
	}
};
