import { Link } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../../pages/orders/orders.module.css";

export function OrdersFeed() {
	return (
		<div className={styles.container_order + " p-6 mb-4"}>
			{" "}
			<Link className={styles.link} to="/feed/:id">
				<div className={styles.order}>
					<p className="text text_type_digits-default">#0536553</p>
					<p className={"text text_type_main-default text_color_inactive"}>
						Сегодня, 16:20
					</p>
				</div>
				<p className="text text_type_main-medium mt-6">
					Death Star Burger Main
				</p>
				<div className={styles.images}>
					{" "}
					<div>!!! images !!!</div>{" "}
					<div className={styles.total + " mt-6"}>
						<div className="text text_type_digits-default pl-6 mr-2">480</div>
						<CurrencyIcon type="primary" />
					</div>
				</div>
			</Link>
		</div>
	);
}
