import {
	ADD,
	CHANGE_ORDER,
	CLEAR_CONSTRUCTOR,
	DELETE,
} from "../actions/burgerConstructor";
import { TElement } from "../utile/types";

export type TInitialStateBurgerConstructor = {
	bunTop: TElement | null;
	list: TElement[];
	bunBottom: TElement | null;
	indexDragOrder: null;
};

const initialState: TInitialStateBurgerConstructor = {
	bunTop: null,
	list: [],
	bunBottom: null,
	indexDragOrder: null,
};

export const burgerConstructorReducer = (
	state = initialState,
	action: any
): TInitialStateBurgerConstructor => {
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

		case CLEAR_CONSTRUCTOR: {
			return {
				...state,
				list: [],
				bunBottom: null,
				bunTop: null,
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
