import { CLOSE_MODAL } from "./ingredientDetails";
export const OPEN_ORDER = "ORDER_DETAILS/OPEN_ORDER";
// export const CLOSE_ORDER = "ORDER_DETAILS/CLOSE_ORDER";

const initialState = {
	// list: [],
	isModal: false,
};

export const orderDetailsReducer = (state = initialState, action) => {
	switch (action.type) {
		case OPEN_ORDER: {
			return {
				...state,
				// list: action.value,
				isModal: true,
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
