import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../reducers";
import { compose } from "redux";
import { socketMiddlewareOrders } from "../middleware/socketMiddlewareOrders";
import { orderHistoryActions } from "../actions/orderHistory";
import { orderProfileActions } from "../actions/orderProfile";
import { wsOrderUrlPrivate, wsOrderUrlPublic } from "../utile/constants";

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

export const composeEnhancers =
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
	applyMiddleware(
		thunk,
		socketMiddlewareOrders(orderHistoryActions, wsOrderUrlPublic),
		socketMiddlewareOrders(orderProfileActions, wsOrderUrlPrivate)
	)
);

export const store = createStore(rootReducer, enhancer);
