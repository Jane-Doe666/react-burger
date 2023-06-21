import React, { useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Store } from "redux";
// import type { RootState, AppDispatch } from './store'

export function useForm<TValue>(inputValues: TValue) {
	const [values, setValues] = useState(inputValues);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = event.target;
		setValues({ ...values, [name]: value });
	};

	return { values, handleChange, setValues };
}

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch

// type DispatchFunc = () => AppDispatch
// export const useAppDispatch: DispatchFunc = useDispatch
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// export const useAppDispatch: () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
