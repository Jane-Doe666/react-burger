import {
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_ERROR,
	TGetIngredientsActions,
} from "../actions/app";
import { TElement } from "../types/types";

type TAppState = {
	items: TElement[];
	isLoading: boolean;
	itemsRequest: boolean;
	itemsFailed: boolean;
};

export const initialState: TAppState = {
	items: [],
	isLoading: true,
	itemsRequest: false,
	itemsFailed: false,
};

export const burgerIngredientsReducer = (
	state = initialState,
	action: TGetIngredientsActions
): TAppState => {
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
