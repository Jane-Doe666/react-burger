import { TInitialStateBurgerConstructor } from "../reducers/burgerConstructor";
import { TElement } from "../utile/types";

type TEl = {
	[key: string]: number;
};

export type TCreator = {
	bunTop: TElement;
	list: TElement[];
	bunBottom: TElement;
	indexDragOrder: null;
};

export const counterByIdSelectorCreator = (state: TCreator) => {
	const data = [...state.list, state.bunTop, state.bunBottom]
		.filter((item) => !!item)
		.map((item) => ({ id: item._id }))
		.reduce((acc: TEl, item) => {
			if (!acc.hasOwnProperty(item.id)) {
				acc[item.id] = 0;
			}
			acc[item.id]++;
			return acc;
		}, {});

	return Object.keys(data).map((itemId) => ({
		id: itemId,
		count: data[itemId],
	}));
};

export const iDInOrderSelectorCreator = (
	state: TInitialStateBurgerConstructor
) => {
	const dataId = [...state.list, state.bunTop, state.bunBottom]
		.filter((item) => item !== undefined)
		.map((item) => item?._id);

	return dataId;
};
