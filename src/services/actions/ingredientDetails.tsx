import { TElement } from "../utile/types";

export const OPEN_INGREDIENT: "INGREDIENT_DETAILS/OPEN_INGREDIENT" =
	"INGREDIENT_DETAILS/OPEN_INGREDIENT";

export type TOpenIngredient = {
	type: typeof OPEN_INGREDIENT;
	info: TElement;
};

export const openIngredientInfo = (info: TElement) => ({
	type: OPEN_INGREDIENT,
	info: info,
});
