import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { store } from "../../components/store";
import { rootReducer, TAllActionsTypes } from "../reducers/index";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { useDispatch } from "react-redux";

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export type AppThunk<ReturnType = void> = ActionCreator<
// 	ThunkAction<ReturnType, Action, RootState, TAllActionsTypes>
// >;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<TReturn = void> = ActionCreator<
	ThunkAction<TReturn, Action, RootState, TAllActionsTypes>
>;
export const useAppDispatch = () => useDispatch<AppDispatch & AppThunk>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
