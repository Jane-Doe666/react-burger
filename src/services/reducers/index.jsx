import { combineReducers } from "redux";
import { burgerConstructorReducer } from "./burgerConstructor";
import { burgerIngredientsReducer } from "./burgerIngredients";
import { orderDetailsReducer } from "./orderDetails";
import { ingredientDetailsReducer } from "./ingredientDetails";

export const rootReducer = combineReducers({
	app: burgerIngredientsReducer,
	burgerConstructor: burgerConstructorReducer,
	ingredientDetails: ingredientDetailsReducer,
	orderDetails: orderDetailsReducer,
});
