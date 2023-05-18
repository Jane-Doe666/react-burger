import { combineReducers } from "redux";
import { burgerConstructorReducer } from "./burgerConstructor";
import { burgerIngredientsReducer } from "./app";
import { orderDetailsReducer } from "./orderDetails";
import { ingredientDetailsReducer } from "./ingredientDetails";
import { registrationReducer } from "./registration";
import { getAuthorizationReducer } from "./authorization";

export const rootReducer = combineReducers({
	app: burgerIngredientsReducer,
	burgerConstructor: burgerConstructorReducer, //
	ingredientDetails: ingredientDetailsReducer, //
	orderDetails: orderDetailsReducer, //
	registration: registrationReducer,
	// authorization: getAuthorizationReducer,
});
