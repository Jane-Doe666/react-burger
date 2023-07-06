import { CLOSE_MODAL, ICloseModal } from "../actions/app";
import { OPEN_INGREDIENT, TOpenIngredient } from "../actions/ingredientDetails";
import { TElement } from "../utile/types";

type TInitialState = {
	info: TElement | undefined;
	setModal: boolean;
};

const initialState: TInitialState = {
	info: undefined,
	setModal: false,
};

export type TIngredientDetailsActions = TOpenIngredient | ICloseModal;

export const ingredientDetailsReducer = (
	state = initialState,
	action: TIngredientDetailsActions
) => {
	switch (action.type) {
		case OPEN_INGREDIENT: {
			console.log(action);

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
