import {
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_ERROR,
} from "../actions/app";
import { TElement } from "../utile/types";

type TInitialState = {
	items: TElement[];
	isLoading: boolean;
	itemsRequest: boolean;
	itemsFailed: boolean;
};

const initialState: TInitialState = {
	items: [],
	isLoading: true,
	itemsRequest: false,
	itemsFailed: false,
};

export const burgerIngredientsReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case GET_INGREDIENTS_REQUEST: {
			return {
				...state,
				itemsRequest: true,
			};
		}
		case GET_INGREDIENTS_SUCCESS: {
			return {
				...state,
				itemsFailed: false,
				items: action.items,
				itemsRequest: false,
				isLoading: false,
			};
		}
		case GET_INGREDIENTS_ERROR: {
			return {
				...state,
				itemsFailed: true,
				itemsRequest: false,
				isLoading: true,
			};
		}
		default: {
			return state;
		}
	}
};
