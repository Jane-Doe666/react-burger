import {
	ConstructorElement,
	Button,
	CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import OrderDetails from "../order-details/OrderDetails";
import { useDrop } from "react-dnd";
import { useCallback, useMemo } from "react";
import { iDInOrderSelectorCreator } from "../../services/selectors/selector";
import { ConstructorElementContainer } from "../burger-constructor-element/Constructor-element";
import { getOrder } from "../../services/actions/orderDetails";
import { pushIngredientToConstructor } from "../../services/actions/burgerConstructor";
import { getCookie } from "../../services/utile/utile";
import { useNavigate } from "react-router-dom";
import { closeModal } from "../../services/actions/app";
import { Loader } from "../loader/Loader";
import { TElement } from "../../services/types/types";
import { Modal } from "../modal/Modal";
import {
	useAppDispatch,
	useAppSelector,
} from "../../services/types/typesRedux";

export default function BurgerConstructor() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const ingredients = useAppSelector((state) => state.burgerConstructor.list);
	const bunTop = useAppSelector((state) => state.burgerConstructor.bunTop);
	const bunBottom = useAppSelector(
		(state) => state.burgerConstructor.bunBottom
	);
	const isCookie = getCookie("refreshToken");
	const openedModal = useAppSelector((state) => state.orderDetails.isModal);
	const isLoading = useAppSelector((state) => state.orderDetails.isLoader);

	const closePopup = useCallback(() => dispatch(closeModal()), [dispatch]);

	const iDIngredientsInOrder = useAppSelector((state) =>
		iDInOrderSelectorCreator(state.burgerConstructor)
	);

	const handleOpenedOrder = () => {
		let ids = { ingredients: iDIngredientsInOrder };
		ids.ingredients = ids.ingredients.filter((item) => !!item);

		return !isCookie ? navigate("/login") : dispatch(getOrder(ids));
	};

	const [, dropTarget] = useDrop({
		accept: "ingredient",
		drop(item: TElement) {
			dispatch(pushIngredientToConstructor(item.id));
		},
	});

	const getTotalOrder = (ingredients: TElement[], bunTop: TElement | null) => {
		const data = bunTop
			? bunTop.price * 2 +
			  ingredients.reduce((acc: number, item: TElement) => acc + item.price, 0)
			: ingredients.reduce(
					(acc: number, item: TElement) => acc + item.price,
					0
			  );
		return data;
	};

	const totalCost = useMemo(() => {
		return getTotalOrder(ingredients, bunTop);
	}, [ingredients, bunTop]);

	return (
		<section className={styles.section} ref={dropTarget}>
			<div className={styles.list}>
				{bunTop && (
					<div className={styles.elementTop}>
						<ConstructorElement
							type="top"
							isLocked={true}
							key={bunTop.newId}
							text={bunTop.name + " (верх)"}
							price={bunTop.price}
							thumbnail={bunTop.image}
						/>
					</div>
				)}

				<div className={styles.scrollbar}>
					{ingredients.map((element: TElement, index: number) => (
						<div key={element.key}>
							{" "}
							<ConstructorElementContainer element={element} index={index} />
						</div>
					))}
				</div>

				{bunBottom && (
					<div className={styles.elementBottom}>
						<ConstructorElement
							key={bunBottom.newId}
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
						handleOpenedOrder();
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
				{isLoading ? (
					<div>
						<Loader />
					</div>
				) : (
					openedModal && (
						<Modal handleClose={closePopup}>
							<OrderDetails />
						</Modal>
					)
				)}
			</>
		</section>
	);
}
