export const UPDATE_DATA = "UPDATE_DATA";

const initialState = {
	data: [],
	isLoading: true,
};

export const burgerIngredientsReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_DATA: {
			return {
				...state,
				data: action.value,
				isLoading: false,
			};
		}
		default: {
			return state;
		}
	}
};
