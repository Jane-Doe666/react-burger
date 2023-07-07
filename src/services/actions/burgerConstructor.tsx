import { v4 as uuidv4 } from "uuid";
import { TElement } from "../utile/types";
import { AppThunk } from "../utile/typesRedux";

export const ADD: "BURGER_CONSTRUCTOR/ADD" = "BURGER_CONSTRUCTOR/ADD";
export const DELETE: "BURGER_CONSTRUCTOR/DELETE" = "BURGER_CONSTRUCTOR/DELETE";
export const CHANGE_ORDER: "BURGER_CONSTRUCTOR/CHANGE_ORDER" =
	"BURGER_CONSTRUCTOR/CHANGE_ORDER";
export const CLEAR_CONSTRUCTOR: "BURGER_CONSTRUCTOR/CLEAR_CONSTRUCTOR_AFTER_SUCCESS" =
	"BURGER_CONSTRUCTOR/CLEAR_CONSTRUCTOR_AFTER_SUCCESS";

export interface IBurgerConstructorAdd {
	readonly type: typeof ADD;
	payload: TElement;
}

export interface IBurgerConstructorDelete {
	readonly type: typeof DELETE;
	payload: TElement;
}

export interface IBurgerConstructorChange {
	readonly type: typeof CHANGE_ORDER;
	payload: TElement[];
}

export interface IBurgerConstructorClear {
	readonly type: typeof CLEAR_CONSTRUCTOR;
}

export type TBurgerConstructor =
	| IBurgerConstructorAdd
	| IBurgerConstructorDelete
	| IBurgerConstructorChange
	| IBurgerConstructorClear;

export const addIngredientToConstructor = (payload: TElement) => ({
	type: ADD,
	payload: payload,
});

export const deleteIngredientFromConstructor = (payload: TElement) => ({
	type: DELETE,
	payload: payload,
});

export const changeOrderInConstructor = (payload: any) => ({
	type: CHANGE_ORDER,
	payload: payload,
});

export const pushIngredientToConstructor: AppThunk = (id: string) => {
	return function (dispatch, getstate) {
		const currentState = getstate();
		const pushElement = currentState.app.items.find(
			(item: TElement) => item._id === id
		);
		pushElement.newId = uuidv4();
		pushElement.key = pushElement.newId;
		dispatch(addIngredientToConstructor(pushElement));
	};
};
