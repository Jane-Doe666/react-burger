import { CLOSE_MODAL } from "../actions/app";
export const OPEN_INGREDIENT = "INGREDIENT_DETAILS/OPEN_INGREDIENT";

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
