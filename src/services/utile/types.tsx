import { ReactNode } from "react";

export type TRegistrationAnswer = {
	success: boolean;
	accessToken: string;
	refreshToken: string;
	user: {
		email: string;
		name: string;
	};
};

export type TUserInfo = {
	success: boolean;
	user: {
		email: string;
		name: string;
	};
};

export type TReset = {
	email: "" | string;
};

export type TPasswordResetReset = {
	password: "" | string;
	token: "" | string;
};

export type TRegister = {
	email: "" | string;
	password: "" | string;
	name: "" | string;
};

export type TAuth = {
	email: "" | string;
	password: "" | string;
};

export type TRefreshToken = {
	token: string;
};

export type TIngredirntsArray = string[];

export type TValue = {
	[key: string]: string;
};

export type TElement = {
	readonly calories: number;
	readonly carbohydrates: number;
	readonly fat: number;
	readonly image: string;
	readonly image_large: string;
	readonly image_mobile: string;
	readonly key: string;
	readonly name: string;
	readonly newId: string | null;
	readonly price: number;
	readonly proteins: number;
	readonly type: string;
	__v: number;
	readonly _id: string;
	index: number;
	id: string;
	qty?: number | any;
};

export type TItem = {
	item: {
		createdAt: string;
		ingredients: [];
		name: string;
		number: number;
		status: string;
		updatedAt: string;
		_id: string;
	};
};

export type TItemOrderFeed = {
	createdAt: string;
	ingredients: [];
	name: string;
	number: number;
	status: string;
	updatedAt: string;
	_id: string | undefined;
};

export type TFeed = {
	success: boolean;
	orders: TItemOrderFeed[];
	total: number;
	totalToday: number;
};

export type TConstructorElement = {
	index: number;
	element: TElement;
	topOrBottom?: "top" | "bottom";
	extraName?: string;
};

export type TProtectedRoute = {
	authOnly?: boolean;
	children: ReactNode;
};

export type TIngredients = {
	readonly success: boolean;
	readonly data: TElement[];
};

export type TIdsList = {
	ingredients: (string | undefined)[];
};

export type TIds = {
	ingredients: (string | undefined)[];
};

export type TWsMessage = {
	success: boolean;
	orders: TItemOrderFeed[];
	total: number;
	totalToday: number;
};

export type TWsTest = {
	success: boolean;
	orders: TItemOrderFeed[];
	total: number;
	totalToday: number;
};

export type TUser = {
	success: boolean;
	user: { email: string; name: string };
};
