import { Link } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../../pages/orders/orders.module.css";
import { useSelector } from "react-redux";
import { TElement } from "../../services/utile/types";
import { createDataOrder } from "../../services/utile/utile";

export type TItem = {
	item: {
		createdAt: string;
		ingredients: [];
		name: string;
		number: number;
		status: string;
		updatedAt: string;
		_id: string;
	};
};

export function OrdersFeed(item: TItem) {
	const { createdAt, number, status, name, updatedAt, ingredients, _id } =
		item.item; // ID
	const ingredientsBD = useSelector((state: any) => state.app.items); // DataBase
	const ingredientsInOrder = ingredients.map((element) =>
		ingredientsBD.find((item: TElement) => item._id === element)
	);

	const totalCostOrder = ingredientsInOrder.reduce((acc, item) => {
		const total = acc + item.price;
		return total;
	}, 0);

	const orderDay = createDataOrder(updatedAt);

	return (
		<div className={styles.container_order + " p-6 mb-4"}>
			{" "}
			<Link className={styles.link} to="/feed/:id">
				<div className={styles.order}>
					<p className="text text_type_digits-default">#{number}</p>
					<p className={"text text_type_main-default text_color_inactive"}>
						{orderDay}
					</p>
				</div>
				<p className="text text_type_main-medium mt-6">{name}</p>
				<p
					className={
						status === "done"
							? styles.status + " text text_type_main-default mt-2"
							: " text text_type_main-default mt-2"
					}>
					{status === "done" && <p>Готов</p>}
					{status === "pending" && <p>Готовиться</p>}
					{status === "created" && <p>Создан</p>}
				</p>

				<div className={styles.images}>
					<div className={styles.image_container}>
						{ingredientsInOrder.map((item) => (
							<div className={styles.image_div}>
								<img
									className={styles.image}
									src={item.image_mobile}
									alt="картинка ингредиента"></img>
							</div>
						))}
					</div>

					<div className={styles.total + " mt-6"}>
						<div className="text text_type_digits-default pl-6 mr-2">
							{totalCostOrder}
						</div>
						<CurrencyIcon type="primary" />
					</div>
				</div>
			</Link>
		</div>
	);
}
