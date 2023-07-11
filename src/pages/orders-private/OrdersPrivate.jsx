import { useEffect } from "react";
import { Loader } from "../../components/loader/Loader";
import { OrderLink } from "../../components/order-link/OrderLink";
import {
	orderProfileClosed,
	orderProfileStart,
} from "../../services/actions/orderProfile";
import {
	useAppSelector,
	useAppDispatch,
} from "../../services/types/typesRedux";
import styles from "../orders-public/orders.module.css";

export function OrdersPrivate() {
	const dispatch = useAppDispatch();
	const listOfOrders = useAppSelector((state) => state.orderInProfile.messages);

	function compare(a, b) {
		var dateA = new Date(a.createdAt);
		var dateB = new Date(b.createdAt);
		return dateB - dateA;
	}

	useEffect(() => {
		dispatch(orderProfileStart());
		return () => {
			dispatch(orderProfileClosed());
		};
	}, [dispatch]);

	return listOfOrders?.success ? (
		<div className={styles.mainOrdersFeed}>
			{" "}
			<div className={styles.scroll + " pr-2"}>
				{listOfOrders?.orders?.sort(compare).map((item) => {
					return <OrderLink key={item._id} item={item} />;
				})}
			</div>
		</div>
	) : (
		<Loader />
	);
}
