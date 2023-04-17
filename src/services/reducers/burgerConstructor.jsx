export const ADD = "BURGER_CONSTRUCTOR/ADD";
export const DELETE = "BURGER_CONSTRUCTOR/DELETE";

const initialState = {
	bun: undefined,
	list: [],
};

export const burgerConstructorReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD: {
			if (action.payload.type !== "bun") {
				return {
					...state,
					list: [...state.list, action.payload],
				};
			}
			return {
				...state,
				bun: action.payload,
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
