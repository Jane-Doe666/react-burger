// import {
// 	AUTHORIZATION_SUCCESS,
// 	AUTHORIZATION_REQUEST,
// 	AUTHORIZATION_ERROR,
// } from "../actions/authorization";

// const intialState = {
// 	itemsRequest: false,
// 	userName: "",
// 	email: "",
// 	isAuth: false,
// 	data: {},
// };

// export const getAuthorizationReducer = (state = intialState, action) => {
// 	switch (action.type) {
// 		case AUTHORIZATION_REQUEST: {
// 			return {
// 				...state,
// 				itemsRequest: true,
// 			};
// 		}
// 		case AUTHORIZATION_SUCCESS: {
// 			console.log("AUTHORIZATION_reducer: ", action);
// 			return {
// 				...state,
// 				data: { ...action.payload },
// 				userName: action.payload.user.name,
// 				email: action.payload.user.email,
// 				isAuth: true,
// 				itemsRequest: false,
// 			};
// 		}
// 		case AUTHORIZATION_ERROR: {
// 			return {
// 				...state,
// 				itemsRequest: false,
// 			};
// 		}
// 		default: {
// 			return state;
// 		}
// 	}
// };
