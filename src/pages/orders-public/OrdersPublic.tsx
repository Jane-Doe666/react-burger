import styles from "./orders.module.css";
import { OrderLink } from "../../components/order-link/OrderLink";
import { useEffect } from "react";
import {
	orderHistoryClosedByUser,
	orderHistoryStart,
} from "../../services/actions/orderHistory";
import {
	useAppDispatch,
	useAppSelector,
} from "../../services/types/typesRedux";
import { TItemOrderFeed } from "../../services/types/types";
import { Loader } from "../../components/loader/Loader";

export function OrdersPublic() {
	const dispatch = useAppDispatch();
	const listOfOrders = useAppSelector((state) => state.orderHistory.messages);

	function compare(a: TItemOrderFeed, b: TItemOrderFeed) {
		var dateA: any = new Date(a.createdAt);
		var dateB: any = new Date(b.createdAt);
		return dateA - dateB;
	}

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
					{listOfOrders?.orders?.sort(compare).map((item) => {
						return <OrderLink key={item?._id} item={item} />;
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
									styles.scrollProgress + " text text_type_digits-default"
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
		<Loader />
	);
}
