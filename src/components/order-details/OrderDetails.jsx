import styles from "./orderDetails.module.css";
import flag from "../../images/doneflag.png";
import { useAppSelector } from "../../services/utile/typesRedux";

export default function OrderDetails() {
	const orderDetails = useAppSelector((state) => state.orderDetails.items);

	return (
		orderDetails && (
			<div className={styles.form + " pl-25 pr-25"}>
				<p className={styles.number + " text text_type_digits-large pt-20"}>
					{orderDetails}
				</p>
				<h2 className={styles.h2 + " text text_type_main-default mt-8"}>
					идентификатор заказа
				</h2>
				<img className={styles.img + " mt-15"} src={flag} alt="flag" />
				<p className={styles.orderStatus + " text text_type_main-small mt-15"}>
					Ваш заказ начали готовить
				</p>
				<p className={styles.p + " text text_type_main-small mt-2 pb-30"}>
					Дождитесь готовности на орбитральной станции
				</p>
			</div>
		)
	);
}
