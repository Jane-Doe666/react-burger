import { useLocation } from "react-router";
import { TElement, TItemOrderFeed } from "../../services/utile/types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./orderFeedById.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
	WS_CONNECTION_CLOSED,
	WS_CONNECTION_CLOSED_BY_USER,
	WS_CONNECTION_START,
} from "../../services/actions/socketMiddlewareOrders";
import { useParams } from "react-router";
import { createDataOrder } from "../../services/utile/utile";
import { getIngredients } from "../../services/actions/app";
import {
	ORDER_HISTORY_CLOSED_BY_USER,
	ORDER_HISTORY_START,
} from "../../services/actions/orderHistory";

export function OrderFeedById() {
	const location = useLocation();
	const dispatch = useDispatch();
	const paramsID = useParams().id;

	// id в компонент попадает верный, но в модалке отображается один и тот же заказ после первого клика

	console.log(111, paramsID);
	console.log(222, location?.state);

	const ingredientsDataBaseInfo = useSelector((state: any) => state.app.items);
	const listOfOrders = useSelector((state: any) => state.wsOrders.messages);

	const order = listOfOrders?.orders?.find(
		(item: TItemOrderFeed) => (item._id = paramsID)
	);

	const ingredientsInOrder = order?.ingredients.map((element: string) =>
		ingredientsDataBaseInfo?.find((item: TElement) => item._id === element)
	);

	const totalCostOrder = ingredientsInOrder?.reduce(
		(acc: 0, item: TElement) => {
			const total = acc + item?.price;
			return total;
		},
		0
	);

	const orderDay = createDataOrder(order?.updatedAt);

	const arrayUnique = ingredientsInOrder?.reduce(
		(acc: Array<TElement>, item: TElement) => {
			if (acc.includes(item)) {
				item.qty++;
				return [...acc];
			}
			item.qty = 1;
			return [...acc, item];
		},
		[]
	);

	useEffect(() => {
		if (!location?.state) {
			dispatch({
				type: ORDER_HISTORY_START,
			});
			dispatch(getIngredients());
			return () => {
				dispatch({ type: ORDER_HISTORY_CLOSED_BY_USER });
			};
		}
	}, []);

	return listOfOrders.success ? (
		<>
			<div className={styles.main}>
				<p className="text text_type_digits-default"># {order.number}</p>

				<p className={styles.text + " text text_type_main-medium mt-10"}>
					{order.name}
				</p>

				{order.status === "done" && (
					<p
						className={styles.text + " text text_type_main-default mt-3"}
						style={{ color: "#0cc" }}>
						Выполнен
					</p>
				)}

				{order.status === "pending" && (
					<p
						className={styles.text + " text text_type_main-default mt-3"}
						style={{ color: "white" }}>
						Готовится
					</p>
				)}

				{order.status === "delete" && (
					<p
						className={styles.text + " text text_type_main-default mt-3"}
						style={{ color: "red" }}>
						Отменен
					</p>
				)}

				<p className={styles.text + " text text_type_main-medium mt-15"}>
					Состав:
				</p>
				<ul className={styles.ul}>
					{arrayUnique.map((item: TElement, index: number) => (
						<li className={styles.li} key={index}>
							<div className={styles.image_div}>
								<img
									className={styles.image}
									src={item.image_mobile}
									alt={item.name}
								/>
							</div>

							<p className="text text_type_main-default ml-4 mr-4">
								{item.name}
							</p>

							<div className={styles.total + " mr-6"}>
								<p
									className={
										styles.total + " text text_type_digits-default mr-2"
									}>
									{item.qty} x {item.price}
								</p>
								<CurrencyIcon type="primary" />
							</div>
						</li>
					))}
				</ul>
				<div className={styles.totalFoot + " mt-10"}>
					<p className={"text text_type_main-default text_color_inactive"}>
						{orderDay}
					</p>
					<div className={styles.totalFoot}>
						{" "}
						<p className="text text_type_digits-default pl-6 mr-2">
							{totalCostOrder}
						</p>
						<CurrencyIcon type="primary" />
					</div>
				</div>
			</div>
		</>
	) : (
		<div>Loading.....</div>
	);
}
