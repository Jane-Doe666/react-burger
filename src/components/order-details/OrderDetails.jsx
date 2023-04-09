import styles from "./orderDetails.module.css";
import flag from "../../images/doneflag.png";

export default function OrderDetails() {
	return (
		<div className={styles.form}>
			<p className="text text_type_digits-large pt-30">172634</p>
			<h2 className={styles.h2 + " text text_type_main-default mt-8"}>
				идентификатор заказа
			</h2>
			<img className="mt-15" src={flag} alt="flag" />
			<p className={styles.orderStatus + " text text_type_main-small mt-15"}>
				Ваш заказ начали готовить
			</p>
			<p className={styles.p + " text text_type_main-small mt-2 pb-30"}>
				Дождитесь готовности на орбитральной станции
			</p>
		</div>
	);
}
