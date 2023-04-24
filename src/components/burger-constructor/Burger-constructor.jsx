import {
	ConstructorElement,
	Button,
	CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import Modal from "../modal/Modal.jsx";
import OrderDetails from "../order-details/OrderDetails";
import { useDispatch, useSelector } from "react-redux";

import { useDrop } from "react-dnd";
import {
	pushIngredientToConstructor,
	sendIdIngredientsOnServer,
} from "../../services/actions/app";
import { useMemo } from "react";
import { iDInOrderSelectorCreator } from "../../services/selectors/selector";
import { ConstructorElementContainer } from "./Constructor-element";
import { OPEN_ORDER } from "../../services/reducers/orderDetails";

export default function BurgerConstructor() {
	const dispatch = useDispatch();
	const openedModal = useSelector((state) => state.orderDetails.isModal);
	const ingredients = useSelector((state) => state.burgerConstructor.list);
	const bunTop = useSelector((state) => state.burgerConstructor.bunTop);
	const bunBottom = useSelector((state) => state.burgerConstructor.bunBottom);

	let iDIngredientsInOrder = useSelector((state) =>
		iDInOrderSelectorCreator(state)
	);
	iDIngredientsInOrder = { ingredients: iDIngredientsInOrder };

	function openOrder() {
		if (iDIngredientsInOrder.length) return;
		dispatch({ type: OPEN_ORDER });
		dispatch(sendIdIngredientsOnServer(iDIngredientsInOrder));
	}

	const [, dropTarget] = useDrop({
		accept: "ingredient",
		drop({ id }) {
			dispatch(pushIngredientToConstructor(id));
		},
	});

	const totalCost = useMemo(() => {
		return getTotalOrder(ingredients, bunTop);
	}, [ingredients, bunTop]);

	function getTotalOrder(ingredients, bunTop) {
		const data = bunTop
			? bunTop.price * 2 +
			  ingredients.reduce((acc, item) => acc + item.price, 0)
			: ingredients.reduce((acc, item) => acc + item.price, 0);
		return data;
	}

	return (
		<section className={styles.section} ref={dropTarget}>
			<div className={styles.list}>
				{bunTop && (
					<div className={styles.elementTop}>
						<ConstructorElement
							type="top"
							isLocked={true}
							id={bunTop.newID}
							text={bunTop.name + " (верх)"}
							price={bunTop.price}
							thumbnail={bunTop.image}
						/>
					</div>
				)}

				<div className={styles.scrollbar}>
					{ingredients.map((element, index) => (
						<ConstructorElementContainer
							element={element}
							index={index}
							key={element.newID}
						/>
					))}
				</div>

				{bunBottom && (
					<div className={styles.elementBottom}>
						<ConstructorElement
							id={bunBottom.newID}
							type="bottom"
							isLocked={true}
							text={bunBottom.name + " (низ)"}
							price={bunBottom.price}
							thumbnail={bunBottom.image}
						/>
					</div>
				)}
			</div>

			<div className={styles.total + " mt-10 mr-4"}>
				<span>
					{" "}
					<span className={styles.span + " text text_type_digits-medium mr-2"}>
						{totalCost}
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
