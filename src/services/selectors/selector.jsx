export const counterByIdSelectorCreator = (state) => {
	const data = [
		...state.burgerConstructor.list,
		state.burgerConstructor.bunTop,
		state.burgerConstructor.bunBottom,
	]
		.filter((item) => item !== undefined)
		.map((item) => ({ id: item._id }))
		.reduce((acc, item) => {
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
