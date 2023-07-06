import { combineReducers } from "redux";
import { burgerConstructorReducer } from "./burgerConstructor";
import { burgerIngredientsReducer } from "./app";
import { orderDetailsReducer } from "./orderDetails";
import {
	ingredientDetailsReducer,
	TIngredientDetailsActions,
} from "./ingredientDetails";
import { registrationReducer, TRegistrationActions } from "./registration";
import { orderHistoryReducer } from "./orderHistory";
import { orderInProfileReducer } from "./orderInProfile";
import { TOrdersInProfileActions } from "../actions/orderProfile";
import { TOrderHistoryActions } from "../actions/orderHistory";
import { TBurgerConstructor } from "../actions/burgerConstructor";
import { TGetIngredientsActions } from "../actions/app";
import { TOrderDetailsActions } from "../actions/orderDetails";
import { TWsActions } from "../actions/socketMiddlewareOrders";

export const rootReducer = combineReducers({
	app: burgerIngredientsReducer,
	burgerConstructor: burgerConstructorReducer, //
	ingredientDetails: ingredientDetailsReducer, //
	orderDetails: orderDetailsReducer, //
	registration: registrationReducer,
	orderHistory: orderHistoryReducer,
	orderInProfile: orderInProfileReducer,
});

export type TAllActionsTypes =
	| TGetIngredientsActions
	| TBurgerConstructor
	| TIngredientDetailsActions
	| TOrderDetailsActions
	| TOrderHistoryActions
	| TOrdersInProfileActions
	| TRegistrationActions;
