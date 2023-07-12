import React, { useState } from "react";
import type {} from "redux-thunk/extend-redux";

export function useForm<TValue>(inputValues: TValue) {
	const [values, setValues] = useState(inputValues);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = event.target;
		setValues({ ...values, [name]: value });
	};

	return { values, handleChange, setValues };
}
