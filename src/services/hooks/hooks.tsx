import React, { useState } from "react";
import {
	TypedUseSelectorHook,
	useDispatch as dispatchHook,
	useSelector as selectorHook,
} from "react-redux";
import { AppDispatch, AppThunk, RootState } from "../utile/typesRedux";
import type {} from "redux-thunk/extend-redux";

export function useForm<TValue>(inputValues: TValue) {
	const [values, setValues] = useState(inputValues);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = event.target;
		setValues({ ...values, [name]: value });
	};

	return { values, handleChange, setValues };
}
export const useDispatch = () =>
	dispatchHook<AppDispatch>() || dispatchHook<AppThunk>();

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
