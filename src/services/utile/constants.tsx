import { getCookie } from "./utile";

const wsOrderUrl = "wss://norma.nomoreparties.space/orders";
const accessToken = getCookie("accessToken").slice(7);

export const wsOrderUrlPrivate = `${wsOrderUrl}?token=${accessToken}`;
export const wsOrderUrlPublic = "wss://norma.nomoreparties.space/orders/all";
