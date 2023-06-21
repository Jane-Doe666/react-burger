import { TElement } from "../utile/types";

type TEl = {
	[key: string]: number;
};

export type TCounterByIdSelectorCreator = {
	bunTop: TElement;
	list: TElement[];
	bunBottom: TElement;
	indexDragOrder: undefined;
};

export const counterByIdSelectorCreator = (
	state: TCounterByIdSelectorCreator
) => {
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
	state: TCounterByIdSelectorCreator
) => {
	const dataId = [...state.list, state.bunTop, state.bunBottom]
		.filter((item) => item !== undefined)
		.map((item) => item._id);

	return dataId;
};
