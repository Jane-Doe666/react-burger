import {
	ConstructorElement,
	Button,
	CurrencyIcon,
	DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { useState } from "react";
import Modal from "../modal/Modal.jsx";
import PropTypes from "prop-types";
import OrderDetails from "../order-details/OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_ORDER } from "../../services/reducers/orderDetails";

export default function BurgerConstructor({ data }) {
	const dispatch = useDispatch();
	const openedModal = useSelector((state) => state.orderDetails.isModal);

	const elements = data.filter((item) => item.type !== "bun");
	const someBun = data.filter((item) => item.type === "bun");

	function openOrder() {
		dispatch({ type: OPEN_ORDER });
	}

	return (
		<section className={styles.section}>
			<div className={styles.list}>
				<div className={styles.elementTop}>
					<ConstructorElement
						type="top"
						isLocked={true}
						id={someBun[0]._id}
						key={someBun[0]._id}
						text={someBun[0].name + " (верх)"}
						price={someBun[0].price}
						thumbnail={someBun[0].image}
					/>
				</div>

				<div className={styles.scrollbar}>
					{elements.map((element) => (
						<div id={element._id} key={element._id} className={styles.element}>
							<DragIcon type="primary" />
							<ConstructorElement
								text={element.name}
								price={element.price}
								thumbnail={element.image}
							/>
						</div>
					))}
				</div>
				<div className={styles.elementBottom}>
					<ConstructorElement
						id={someBun[0]._id}
						key={someBun[0]._id}
						type="bottom"
						isLocked={true}
						text={someBun[0].name + " (низ)"}
						price={someBun[0].price}
						thumbnail={someBun[0].image}
					/>
				</div>
			</div>

			<div className={styles.total + " mt-10 mr-4"}>
				<span>
					{" "}
					<span className={styles.span + " text text_type_digits-medium mr-2"}>
						666
					</span>
					<CurrencyIcon type="primary" />
				</span>

				<div
					className={styles.button + " ml-10"}
					onClick={() => {
						openOrder();
					}}>
					<div className={styles.but}>
						{" "}
						<Button htmlType="button" type="primary" size="large">
							Оформить заказ
						</Button>
					</div>
				</div>
			</div>

			<>
				{openedModal && (
					<Modal>
						<OrderDetails />
					</Modal>
				)}
			</>
		</section>
	);
}

BurgerConstructor.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
