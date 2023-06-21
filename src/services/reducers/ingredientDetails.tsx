import { CLOSE_MODAL } from "../actions/app";
import { OPEN_INGREDIENT } from "../actions/ingredientDetails";
import { TElement } from "../utile/types";

type TInitialState = {
	info: TElement | undefined;
	setModal: boolean;
};

const initialState: TInitialState = {
	info: undefined,
	setModal: false,
};

export const ingredientDetailsReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case OPEN_INGREDIENT: {
			return {
				...state,
				info: action.info,
				setModal: true,
			};
		}
		case CLOSE_MODAL: {
			return {
				...state,
				setModal: false,
			};
		}
		default: {
			return state;
		}
	}
};
