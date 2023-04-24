import { CLOSE_MODAL } from "../actions/app";
import { OPEN_ORDER } from "../actions/orderDetails";

const initialState = {
	list: {},
	isModal: false,
};

export const orderDetailsReducer = (state = initialState, action) => {
	switch (action.type) {
		case OPEN_ORDER: {
			if (action.payload) {
				return {
					...state,
					list: action.payload,
					isModal: true,
				};
			}
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
