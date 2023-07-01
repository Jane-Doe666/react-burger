import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../services/reducers";
import { compose } from "redux";
import { socketMiddlewareOrders } from "../services/actions/socketMiddlewareOrders";

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const wsApiOrderUrl = "wss://norma.nomoreparties.space/orders";

export const composeEnhancers =
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
	applyMiddleware(thunk, socketMiddlewareOrders(wsApiOrderUrl))
);

export const store = createStore(rootReducer, enhancer);
