export const OPEN_INGREDIENT = "INGREDIENT_DETAILS/OPEN_INGREDIENT";
export const CLOSE_MODAL = "INGREDIENT_DETAILS/CLOSE_MODAL";

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
				info: initialState.info,
				setModal: false,
			};
		}
		default: {
			return state;
		}
	}
};
