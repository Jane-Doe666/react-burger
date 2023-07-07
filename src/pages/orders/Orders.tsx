import styles from "./orders.module.css";
import { useDispatch } from "react-redux";
import { OrderFeed } from "../../components/order-feed/orderFeed";
import { useEffect } from "react";
import {
	orderHistoryClosedByUser,
	orderHistoryStart,
} from "../../services/actions/orderHistory";
import { useAppSelector } from "../../services/utile/typesRedux";
import { TItemOrderFeed } from "../../services/utile/types";

export function Orders() {
	const dispatch = useDispatch();
	const listOfOrders = useAppSelector((state) => state.orderHistory.messages);

	useEffect(() => {
		dispatch(orderHistoryStart());
		return () => {
			dispatch(orderHistoryClosedByUser());
		};
	}, [dispatch]);

	return listOfOrders?.success ? (
		<div className={styles.app}>
			<h1 className={styles.h2 + ` text text_type_main-large pt-10 pb-5`}>
				Лента заказов
			</h1>
			<div className={styles.main}>
				<div className={styles.scroll + " pr-2"}>
					{listOfOrders.orders.map((item: TItemOrderFeed) => {
						return <OrderFeed key={item?._id} item={item} />;
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
								{listOfOrders.orders.map((item: TItemOrderFeed) => {
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
								{listOfOrders.orders.map((item: TItemOrderFeed) => {
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
					<div className="text text_type_digits-large">
						{listOfOrders.total}
					</div>
					<div className="text text_type_main-medium mt-15">
						Выполнено за сегодня:
					</div>
					<div className="text text_type_digits-large">
						{listOfOrders.totalToday}
					</div>
				</div>
			</div>
		</div>
	) : (
		<>Loading....</>
	);
}
