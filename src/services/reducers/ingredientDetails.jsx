import { CLOSE_MODAL } from "../actions/app";
import { OPEN_INGREDIENT } from "../actions/ingredientDetails";

const initialState = {
	info: {},
	setModal: false,
};

export const ingredientDetailsReducer = (state = initialState, action) => {
	switch (action.type) {
		case OPEN_INGREDIENT: {
			return {
				...state,
				info: action.info,
				setModal: true,
			};
		}
		case CLOSE_MODAL: {
			return {
				...state,
				setModal: false,
			};
		}
		default: {
			return state;
		}
	}
};
