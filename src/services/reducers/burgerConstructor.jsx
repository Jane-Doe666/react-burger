import {
	ADD,
	CHANGE_ORDER,
	DELETE,
	CLEAR_CONSTRUCTOR,
} from "../actions/burgerConstructor";

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
		case CLEAR_CONSTRUCTOR: {
			return {
				bunTop: undefined,
				list: [],
				bunBottom: undefined,
				indexDragOrder: undefined,
			};
		}
		default: {
			return state;
		}
	}
};
