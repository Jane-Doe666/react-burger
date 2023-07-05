import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { OrderFeed } from "../../components/order-feed/orderFeed";
import {
	ORDER_PROFILE_CLOSED_BY_USER,
	ORDER_PROFILE_START,
} from "../../services/actions/orderProfile";
import styles from "../orders/orders.module.css";

export function OrdersProfile() {
	const dispatch = useDispatch();
	const listOfOrders = useSelector((state) => state.wsOrders.messages);

	useEffect(() => {
		dispatch({
			type: ORDER_PROFILE_START,
		});
		return () => {
			dispatch({ type: ORDER_PROFILE_CLOSED_BY_USER });
		};
	}, [dispatch]);

	return listOfOrders.success ? (
		<div className={styles.mainOrdersFeed}>
			{" "}
			<div className={styles.scroll + " pr-2"}>
				{listOfOrders.orders.map((item) => {
					return <OrderFeed key={item._id} item={item} />;
				})}
			</div>
		</div>
	) : (
		<div>Loading....</div>
	);
}
