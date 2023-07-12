import { Link } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../../pages/orders-public/orders.module.css";
import { TElement, TItemOrderFeed } from "../../services/types/types";
import { createDataOrder } from "../../services/utile/utile";
import { useLocation } from "react-router";
import { useAppSelector } from "../../services/types/typesRedux";

type TItem = {
	item: TItemOrderFeed;
};

export function OrderLink({ item }: TItem) {
	const { number, name, updatedAt, ingredients, _id, status } = item;
	const ingredientsBD = useAppSelector((state) => state.app.items);
	const ingredientsInOrder = ingredients.map((element) =>
		ingredientsBD.find((item: TElement) => item._id === element)
	);
	const location = useLocation().pathname;
	let totalCostOrder: number = 0;

	if (!!ingredientsInOrder) {
		ingredientsInOrder.filter((item) => {
			if (!!item) {
				totalCostOrder = totalCostOrder + item.price;

				return totalCostOrder;
			}
		});
	}

	const ingredientsQty = ingredientsInOrder.length - 6;
	let orderDay = createDataOrder(updatedAt);

	return item ? (
		<div className={styles.container_order + " p-6 mb-4"}>
			{" "}
			<Link
				className={styles.link}
				to={`${location}/${_id}`}
				state={{
					state: { modal: true },
					background: location,
					items: item,
				}}>
				<div className={styles.order}>
					<p className="text text_type_digits-default">#{number}</p>
					<p className={"text text_type_main-default text_color_inactive"}>
						{orderDay} i-GMT+3
					</p>
				</div>
				<p className="text text_type_main-medium mt-6 mb-6">{name}</p>
				{status === "done" && (
					<p className="text text_type_main-default mt-6 mb-6">Выполнен</p>
				)}
				{status === "pending" && (
					<p
						className={
							styles.statusPending + " text text_type_main-default mt-6 mb-6"
						}>
						Готовится
					</p>
				)}
				{status === "delete" && (
					<p
						className={
							styles.statusDelete + " text text_type_main-default mt-6 mb-6"
						}>
						Отменен
					</p>
				)}
				{status === "created" && (
					<p className="text text_type_main-default mt-6 mb-6">Создан</p>
				)}
				<div className={styles.images}>
					<div className={styles.image_container}>
						{ingredientsInOrder.map((item, index) => {
							if (index < 5) {
								return (
									<div key={index} className={styles.image_div}>
										<img
											className={styles.image}
											src={item?.image_mobile}
											alt={item?.name}
										/>
									</div>
								);
							}
						})}

						{ingredientsInOrder.length == 6 && (
							<div
								key={ingredientsInOrder[5]?.index}
								className={styles.image_div}>
								<img
									className={styles.image}
									src={ingredientsInOrder[5]?.image_mobile}
									alt={ingredientsInOrder[5]?.name}
								/>
							</div>
						)}

						{ingredientsInOrder.length > 6 && (
							<div
								key={ingredientsInOrder[5]?.index}
								className={styles.image_div}>
								<img
									className={styles.image}
									src={ingredientsInOrder[5]?.image_mobile}
									alt={ingredientsInOrder[5]?.name}
								/>
								<div className={styles.last_image}>
									<p className="text text_type_main-small">+{ingredientsQty}</p>
								</div>
							</div>
						)}
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
	) : (
		<div>Loading.....</div>
	);
}
