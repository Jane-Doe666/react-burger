import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { OrderLink } from "../../components/order-link/OrderLink";
import {
	orderProfileClosed,
	orderProfileStart,
} from "../../services/actions/orderProfile";
import { useAppSelector } from "../../services/types/typesRedux";
// import styles from "../orders/orders.module.css";
import styles from "../orders-public/orders.module.css";

export function OrdersPrivate() {
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
					return <OrderLink key={item._id} item={item} />;
				})}
			</div>
		</div>
	) : (
		<div>Loading....</div>
	);
}
