import { ADD, CHANGE_ORDER, DELETE } from "../actions/burgerConstructor";
import { TElement } from "../utile/types";

export type TInitialStateBurgerConstructor = {
	bunTop: TElement | undefined;
	list: TElement[];
	bunBottom: TElement | undefined;
	indexDragOrder: undefined;
};

const initialState: TInitialStateBurgerConstructor = {
	bunTop: undefined,
	list: [],
	bunBottom: undefined,
	indexDragOrder: undefined,
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
