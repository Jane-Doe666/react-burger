export const ADD = "BURGER_CONSTRUCTOR/ADD";
export const DELETE = "BURGER_CONSTRUCTOR/DELETE";
export const CHANGE_ORDER = "BURGER_CONSTRUCTOR/CHANGE_ORDER";

const initialState = {
	bunTop: undefined,
	list: [],
	bunBottom: undefined,
	indexDragOrder: undefined,
};

export const burgerConstructorReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD: {
			if (action.payload.type !== "bun") {
				return {
					...state,
					list: [
						...state.list,
						{
							...action.payload,
						},
					],
				};
			}
			return {
				...state,
				bunTop: action.payload,
				bunBottom: action.payload,
			};
		}
		case DELETE: {
			return {
				...state,
				list: state.list.filter((item) => item.newId !== action.payload.newId),
			};
		}
		case CHANGE_ORDER: {
			return {
				...state,
				list: action.payload,
			};
		}
		default: {
			return state;
		}
	}
};
