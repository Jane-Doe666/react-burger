// import { AUTH_CHECKED, USER_SUCCESS } from "../actions/user";

// const initialState = {
// 	isAuthChecked: false,
// 	isLogged: false,
// 	user: false,
// };

// export const userReduser = (state = initialState, action) => {
// 	switch (action.type) {
// 		case AUTH_CHECKED: {
// 			return {
// 				isAuthChecked: true,
// 				isLogged: action?.payload?.success,
// 				user: action?.payload?.user,
// 			};
// 		}
// 		case USER_SUCCESS: {
// 			return {
// 				isAuthChecked: true,
// 				isLogged: action?.payload?.success,
// 				user: action?.payload?.user,
// 			};
// 		}

// 		default: {
// 			return state;
// 		}
// 	}
// };
