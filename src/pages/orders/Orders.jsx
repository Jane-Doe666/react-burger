import styles from "./orders.module.css";
import { useDispatch } from "react-redux";
import {
	socketMiddlewareOrders,
	WS_CONNECTION_CLOSED,
	WS_CONNECTION_START,
} from "../../services/actions/socketMiddlewareOrders";
import { OrderFeed } from "../../components/order-feed/orderFeed";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
	ORDER_HISTORY_CLOSED_BY_USER,
	ORDER_HISTORY_START,
} from "../../services/actions/orderHistory";
import { useLocation } from "react-router";

export function Orders() {
	const dispatch = useDispatch();
	const location = useLocation();
	const listOfOrders = useSelector((state) => state.wsOrders.messages);
	const { orders, total, totalToday } = listOfOrders;
	console.log(222, location.state);

	useEffect(() => {
		dispatch({
			type: ORDER_HISTORY_START,
		});
		return () => {
			dispatch({ type: ORDER_HISTORY_CLOSED_BY_USER });
		};
	}, [dispatch]);

	return orders ? (
		<div className={styles.app}>
			<h1 className={styles.h2 + ` text text_type_main-large pt-10 pb-5`}>
				Лента заказов
			</h1>
			<div className={styles.main}>
				<div className={styles.scroll + " pr-2"}>
					{orders.map((item) => {
						return <OrderFeed key={item._id} item={item} />;
					})}
				</div>

				<div>
					<div className={styles.orderStatus}>
						<div>
							<h2 className="text text_type_main-medium mb-6">Готовы:</h2>

							<ul
								className={
									styles.scrollReady + " text text_type_digits-default"
								}>
								{orders.map((item) => {
									return item.status === "done" ? (
										<li className={styles.li_ready} key={item._id}>
											{item.number}
										</li>
									) : (
										""
									);
								})}
							</ul>
						</div>

						<div>
							<h2 className="text text_type_main-medium mb-6">В работе:</h2>
							<ul
								className={
									styles.inProgress + " text text_type_digits-default"
								}>
								{orders.map((item) => {
									return item.status === "pending" ? (
										<li className={styles.li_ready} key={item._id}>
											{item.number}
										</li>
									) : (
										""
									);
								})}
							</ul>
						</div>
					</div>
					<div className="text text_type_main-medium mt-15">
						Выполнено за все время:
					</div>
					<div className="text text_type_digits-large">{total}</div>
					<div className="text text_type_main-medium mt-15">
						Выполнено за сегодня:
					</div>
					<div className="text text_type_digits-large">{totalToday}</div>
				</div>
			</div>
		</div>
	) : (
		<>Loading....</>
	);
}
