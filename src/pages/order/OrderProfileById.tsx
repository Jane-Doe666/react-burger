import { useLocation } from "react-router";
import { TElement } from "../../services/types/types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order.module.css";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { createDataOrder } from "../../services/utile/utile";
import {
	orderProfileClosed,
	orderProfileStart,
} from "../../services/actions/orderProfile";
import { useAppSelector } from "../../services/types/typesRedux";

export function OrderProfileById() {
	const location = useLocation();
	const dispatch = useDispatch();
	const paramsID = useParams().id;
	let orderDay: string = "";

	const ingredientsDataBaseInfo = useAppSelector((state) => state.app.items);
	const listOfOrders = useAppSelector((state) => state.orderInProfile.messages);

	const order = listOfOrders?.orders?.find(
		(item) => item._id === paramsID && !!item
	);

	if (!!order) {
		orderDay = createDataOrder(order.updatedAt);
	}

	const ingredientsInOrder = React.useMemo(() => {
		return order?.ingredients.map((element) =>
			ingredientsDataBaseInfo?.find((item) => item._id === element)
		);
	}, [order]);

	const totalCostOrder = React.useMemo(() => {
		return (
			!!ingredientsInOrder &&
			ingredientsInOrder
				?.filter((item) => !!item)
				.reduce((acc, item) => {
					const total = !!item ? acc + item.price : acc;
					return total;
				}, 0)
		);
	}, [ingredientsInOrder]);

	const arrayUnique = React.useMemo(() => {
		return ingredientsInOrder?.reduce((acc: TElement[], item: any) => {
			if (acc.includes(item)) {
				item.qty++;
				return [...acc];
			}
			item.qty = 1;
			return [...acc, item];
		}, []);
	}, [ingredientsInOrder]);

	useEffect(() => {
		if (!location?.state) {
			dispatch(orderProfileStart());

			return () => {
				dispatch(orderProfileClosed());
			};
		}
	}, []);

	return listOfOrders?.success ? (
		<>
			<div className={styles.main}>
				<p className="text text_type_digits-default"># {order?.number}</p>

				<p className={styles.text + " text text_type_main-medium mt-10"}>
					{order?.name}
				</p>

				{order?.status === "done" && (
					<p className={styles.textDone + " text text_type_main-default mt-3"}>
						Выполнен
					</p>
				)}

				{order?.status === "pending" && (
					<p className={styles.text + " text text_type_main-default mt-3"}>
						Готовится
					</p>
				)}

				{order?.status === "delete" && (
					<p
						className={styles.textDelete + " text text_type_main-default mt-3"}>
						Отменен
					</p>
				)}

				<p className={styles.text + " text text_type_main-medium mt-15"}>
					Состав:
				</p>
				<ul className={styles.ul}>
					{arrayUnique?.map((item, index) => (
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
						<p className="text text_type_digits-default pl-6 mr-2">
							{totalCostOrder}
						</p>
						<CurrencyIcon type="primary" />
					</div>
				</div>
			</div>
		</>
	) : (
		<div>Loading.....</div>
	);
}
