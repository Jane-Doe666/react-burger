import styles from "./orders.module.css";
import { useDispatch } from "react-redux";
import {
	socketMiddlewareOrders,
	WS_CONNECTION_CLOSED,
	WS_CONNECTION_START,
} from "../../services/actions/socketMiddlewareOrders";
import { OrdersFeed } from "../../components/order-feed/orderFeed";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export function Orders() {
	const dispatch = useDispatch();
	const listOfOrders = useSelector((state) => state.wsOrders.messages);

	const { orders, total, totalToday } = listOfOrders;
	// console.log(999, orders?.length);
	// console.log(1, ordersWs);

	useEffect(() => {
		dispatch({
			type: WS_CONNECTION_START,
		});
		return () => {
			dispatch({ type: WS_CONNECTION_CLOSED });
		};
	}, [dispatch]);

	return (
		<div className={styles.app}>
			<h1 className={styles.h2 + ` text text_type_main-large pt-10 pb-5`}>
				Лента заказов
			</h1>
			<div className={styles.main}>
				<div className={styles.scroll + " pr-2"}>
					{orders?.length ? (
						orders.map((item) => {
							return <OrdersFeed key={item._id} item={item} />;
						})
					) : (
						<>Loading....</>
					)}
				</div>

				<div>
					<div className={styles.orderStatus}>
						<div>
							<h2 className="text text_type_main-medium mb-6">Готовы:</h2>
							<ul className={styles.ready + " text text_type_digits-default"}>
								<li className="mb-2">11111</li>
								<li className="mb-2">22222</li>
								<li className="mb-2">33333</li>
								<li className="mb-2">44444</li>
								<li className="mb-2">55555</li>
							</ul>
						</div>

						<div>
							<h2 className="text text_type_main-medium mb-6">В работе:</h2>
							<ul
								className={
									styles.inProgress + " text text_type_digits-default"
								}>
								<li className="mb-2">11111</li>
								<li className="mb-2">22222</li>
								<li className="mb-2">33333</li>
								<li className="mb-2">44444</li>
								<li className="mb-2">55555</li>
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
	);
}

// ws.onopen = (event) => {
// 	console.log("Соединение установлено");
// 	console.log(event.type);
// };

// ws.onmessage = (event) => {
// 	const userMessage = event.data;
// 	console.log(userMessage); // {id: 1, name: 'Иванов Василий', message: 'Привет, дома? Пришли показатели счётчиков, срочно!'}
// };
