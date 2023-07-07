import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { OrderFeed } from "../../components/order-feed/orderFeed";
import {
	orderProfileClosed,
	orderProfileStart,
} from "../../services/actions/orderProfile";
import { useAppSelector } from "../../services/utile/typesRedux";
import styles from "../orders/orders.module.css";

export function OrdersProfile() {
	const dispatch = useDispatch();
	const listOfOrders = useAppSelector((state) => state.orderInProfile.messages);

	useEffect(() => {
		dispatch(orderProfileStart());
		return () => {
			dispatch(orderProfileClosed());
		};
	}, [dispatch]);

	return listOfOrders ? (
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
