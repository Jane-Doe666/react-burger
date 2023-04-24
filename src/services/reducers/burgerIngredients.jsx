import { UPDATE_DATA } from "../actions/burgerIngredients";

const initialState = {
	data: [],
	isLoading: true,
};

export const burgerIngredientsReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_DATA: {
			return {
				...state,
				data: action.payload,
				isLoading: false,
			};
		}
		default: {
			return state;
		}
	}
};
