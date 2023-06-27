import { useLocation } from "react-router";
import { TElement } from "../../services/utile/types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./orderFeedById.module.css";

export function OrderFeedById() {
	const { orderInfo, ingredients, cost, orderDay } = useLocation().state;
	const { number, name, status } = orderInfo.item;
	const orderStatus =
		status === "done" ? "Выполнен" : status === "pending" ? "#0cc" : "Отменен";
	const statusColor =
		status === "done" ? "#0cc" : status === "pending" ? "white" : "red";

	const arrayUnique = ingredients.reduce(
		(acc: Array<TElement>, item: TElement) => {
			if (acc.includes(item)) {
				item.qty++;
				return [...acc];
			}
			item.qty = 1;
			return [...acc, item];
		},
		[]
	);
	const scrollStyle = arrayUnique.length > 4 ? styles.ul : styles.ul_wo_scroll;

	return (
		<>
			<div className={styles.main}>
				<p className="text text_type_digits-default"># {number}</p>
				<p className={styles.text + " text text_type_main-medium mt-10"}>
					{name}
				</p>
				<p
					className={styles.text + " text text_type_main-default mt-3"}
					style={{ color: statusColor }}>
					{orderStatus}
				</p>
				<p className={styles.text + " text text_type_main-medium mt-15"}>
					Состав:
				</p>
				<ul className={scrollStyle}>
					{arrayUnique.map((item: TElement, index: number) => (
						<li className={styles.li} key={index}>
							<div className={styles.image_div}>
								<img
									className={styles.image}
									src={item.image_mobile}
									alt={item.name}
								/>
							</div>

							<p className="text text_type_main-default ml-4 mr-4">
								{item.name}
							</p>

							<div className={styles.total + " mr-6"}>
								<p
									className={
										styles.total + " text text_type_digits-default mr-2"
									}>
									{item.qty} x {item.price}
								</p>
								<CurrencyIcon type="primary" />
							</div>
						</li>
					))}
				</ul>
				<div className={styles.totalFoot + " mt-10"}>
					<p className={"text text_type_main-default text_color_inactive"}>
						{orderDay}
					</p>
					<div className={styles.totalFoot}>
						{" "}
						<p className="text text_type_digits-default pl-6 mr-2">{cost}</p>
						<CurrencyIcon type="primary" />
					</div>
				</div>
			</div>
		</>
	);
}
