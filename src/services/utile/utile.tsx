export function setCookie(name: string, value: string, options: any = {}) {
	options = {
		path: "/",
		...options,
	};

	if (options.expires instanceof Date) {
		options.expires = options.expires.toUTCString();
	}

	let updatedCookie =
		encodeURIComponent(name) + "=" + encodeURIComponent(value);

	for (let optionKey in options) {
		updatedCookie += "; " + optionKey;
		let optionValue = options[optionKey];
		if (optionValue !== true) {
			updatedCookie += "=" + optionValue;
		}
	}

	document.cookie = updatedCookie;
}

export const getCookie = (name: string) => {
	let matches = document.cookie.match(
		new RegExp(
			"(?:^|; )" +
				name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
				"=([^;]*)"
		)
	);
	return matches ? decodeURIComponent(matches[1]) : "";
};

export function deleteCookie(name: string) {
	setCookie(name, "", {
		"max-age": -1,
	});
}

export const createDataOrder = (updatedAt: string) => {
	const date = Date.parse(updatedAt);
	const isNow = Date.now();
	const dateParse = isNow - date;

	let minutes: string | number = Math.floor((dateParse / (1000 * 60)) % 60);
	let hours: string | number = Math.floor((dateParse / (1000 * 60 * 60)) % 24);
	let days = Math.floor(dateParse / (1000 * 60 * 60 * 24));

	minutes = minutes > 9 ? minutes : "0" + minutes;
	hours = hours > 9 ? hours : "0" + hours;
	const daysMessage = days % 10;

	if (days === 0) return `Сегодня ${hours}:${minutes}`;
	if (days === 1) return `Вчера ${hours}:${minutes}`;

	if ((days < 5 && days % 3) || days % 4)
		return `${days} дня назад, ${hours}:${minutes}`;

	if (days > 20 && daysMessage === 1)
		return `${days} день назад, ${hours}:${minutes}`;

	if ((days > 20 && daysMessage === 2) || 3 || 4)
		return `${days} дня назад, ${hours}:${minutes}`;

	return `${days} дней назад, ${hours}:${minutes}`;
};
