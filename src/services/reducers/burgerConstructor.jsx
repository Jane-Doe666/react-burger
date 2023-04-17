export const ADD = "BURGER_CONSTRUCTOR/ADD";
export const DELETE = "BURGER_CONSTRUCTOR/DELETE";

const initialState = {
	list: [],
};

export const burgerConstructorReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD: {
			return {
				...state,
				list: action.value,
			};
		}
		case DELETE: {
			return {
				...state,
				list: state.list.filter((item) => item._id !== action.value),
			};
		}
		default: {
			return state;
		}
	}
};
