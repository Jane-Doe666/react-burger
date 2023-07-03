import { OrderFeed } from "../../components/order-feed/orderFeed";
import {
	ORDER_PROFILE_CLOSED_BY_USER,
	ORDER_PROFILE_START,
} from "../../services/actions/orderProfile";

export function OrdersProfile() {
	useEffect(() => {
		dispatch({
			type: ORDER_PROFILE_START,
		});
		return () => {
			dispatch({ type: ORDER_PROFILE_CLOSED_BY_USER });
		};
	}, [dispatch]);

	useEffect(() => {
		dispatch({
			type: WS_CONNECTION_START,
		});
		return () => {
			dispatch({ type: WS_CONNECTION_CLOSED });
		};
	}, [dispatch]);

	return <>123</>;
}
