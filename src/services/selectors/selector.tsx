import { TInitialStateBurgerConstructor } from "../reducers/burgerConstructor";

export const counterByIdSelectorCreator = (
	state: TInitialStateBurgerConstructor
) => {
	let data = state.list;
	if (!!state.bunTop && !!state.bunBottom) {
		data = [...data, state.bunTop, state.bunBottom];
	}

	return data;
};

export const iDInOrderSelectorCreator = (
	state: TInitialStateBurgerConstructor
) => {
	const dataId = [...state.list, state.bunTop, state.bunBottom]
		.filter((item) => item !== undefined)
		.map((item) => item?._id);

	return dataId;
};
