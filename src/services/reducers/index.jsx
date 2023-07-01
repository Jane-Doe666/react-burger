import { combineReducers } from "redux";
import { burgerConstructorReducer } from "./burgerConstructor";
import { burgerIngredientsReducer } from "./app";
import { orderDetailsReducer } from "./orderDetails";
import { ingredientDetailsReducer } from "./ingredientDetails";
import { registrationReducer } from "./registration";
import { wsReducerOrders } from "./wsOrder";
import { orderHistoryReducer } from "./orderHistory";
import { orderInProfileReducer } from "./orderInProfile";

export const rootReducer = combineReducers({
	app: burgerIngredientsReducer,
	burgerConstructor: burgerConstructorReducer, //
	ingredientDetails: ingredientDetailsReducer, //
	orderDetails: orderDetailsReducer, //
	registration: registrationReducer,
	wsOrders: wsReducerOrders,
	orderHistory: orderHistoryReducer,
	orderInProfile: orderInProfileReducer,
});
