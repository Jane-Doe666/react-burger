import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { store } from "../../components/store";
import { rootReducer } from "../reducers/index";
import { useSelector, TypedUseSelectorHook } from "react-redux";

type TApplicationActions = any; // типизировать редюсеры
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
	ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
