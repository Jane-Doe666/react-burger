import {
	ConstructorElement,
	Button,
	CurrencyIcon,
	DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import Modal from "../modal/Modal.jsx";
import OrderDetails from "../order-details/OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_ORDER } from "../../services/reducers/orderDetails";
import { useDrop } from "react-dnd";
import {
	pushIngredientToConstructor,
	sendIdIngredientsOnServer,
} from "../../services/actions/app";
import { useMemo } from "react";
import { DELETE } from "../../services/reducers/burgerConstructor";
import { iDInOrderSelectorCreator } from "../../services/selectors/selector";

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

	function getTotalOrder(ingredients, bunTop) {
		const data = bunTop
			? bunTop.price * 2 +
			  ingredients.reduce((acc, item) => acc + item.price, 0)
			: ingredients.reduce((acc, item) => acc + item.price, 0);
		return data;
	}

	const totalCost = useMemo(() => {
		return getTotalOrder(ingredients, bunTop);
	}, [ingredients, bunTop]);

	const [, dropTarget] = useDrop({
		accept: "ingredient",
		drop({ id }) {
			dispatch(pushIngredientToConstructor(id));
		},
	});

	function openOrder() {
		if (iDIngredientsInOrder.length) return;
		dispatch({ type: OPEN_ORDER });
		dispatch(sendIdIngredientsOnServer(iDIngredientsInOrder));
	}

	// function sendOrderDetails() {
	// 	if (iDIngredientsInOrder.length) return;
	// 	dispatch(sendIdIngredientsOnServer(iDIngredientsInOrder));
	// }

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
							key={bunTop.newID}
						/>
					</div>
				)}

				<div className={styles.scrollbar}>
					{ingredients.map((element) => (
						<div
							id={element._id}
							key={element.newID}
							className={styles.element}>
							<DragIcon type="primary" />
							<ConstructorElement
								text={element.name}
								price={element.price}
								thumbnail={element.image}
								handleClose={() => dispatch({ type: DELETE, payload: element })}
							/>
						</div>
					))}
				</div>

				{bunBottom && (
					<div className={styles.elementBottom}>
						<ConstructorElement
							key={bunBottom.newID}
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
