import {
	ADD,
	CHANGE_ORDER,
	CLEAR_CONSTRUCTOR,
	DELETE,
	TBurgerConstructor,
} from "../actions/burgerConstructor";
import { TElement } from "../types/types";

export type TInitialStateBurgerConstructor = {
	bunTop: TElement | null;
	list: TElement[];
	bunBottom: TElement | null;
	indexDragOrder: null;
};

export const initialState: TInitialStateBurgerConstructor = {
	bunTop: null,
	list: [],
	bunBottom: null,
	indexDragOrder: null,
};

export const burgerConstructorReducer = (
	state = initialState,
	action: TBurgerConstructor
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
			console.log(1, state);
			console.log(2, action);

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
