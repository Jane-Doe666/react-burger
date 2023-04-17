import {
	ConstructorElement,
	Button,
	CurrencyIcon,
	DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import Modal from "../modal/Modal.jsx";
import PropTypes from "prop-types";
import OrderDetails from "../order-details/OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_ORDER } from "../../services/reducers/orderDetails";
import { useDrop } from "react-dnd";
import { ADD } from "../../services/reducers/burgerConstructor";
import { pushIngredientToConstructor } from "../../services/actions/app";

export default function BurgerConstructor({ data }) {
	const dispatch = useDispatch();
	const openedModal = useSelector((state) => state.orderDetails.isModal);
	const ingredients = useSelector((state) => state.burgerConstructor.list);
	const bun = useSelector((state) => state.burgerConstructor.bun);

	const [, dropTarget] = useDrop({
		accept: "ingredient",
		drop({ id }) {
			dispatch(pushIngredientToConstructor(id));
		},
	});

	const elements = data.filter((item) => item.type !== "bun");
	const someBun = data.filter((item) => item.type === "bun");

	function openOrder() {
		dispatch({ type: OPEN_ORDER });
	}

	return (
		<section className={styles.section} ref={dropTarget}>
			<div className={styles.list}>
				{bun && (
					<div className={styles.elementTop}>
						<ConstructorElement
							type="top"
							isLocked={true}
							id={bun.newID}
							text={bun.name + " (верх)"}
							price={bun.price}
							thumbnail={bun.image}
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
							/>
						</div>
					))}
				</div>

				{bun && (
					<div className={styles.elementBottom}>
						<ConstructorElement
							id={bun.newID}
							type="bottom"
							isLocked={true}
							text={bun.name + " (низ)"}
							price={bun.price}
							thumbnail={bun.image}
						/>
					</div>
				)}
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
