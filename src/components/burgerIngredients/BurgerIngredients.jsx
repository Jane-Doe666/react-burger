import {
	ConstructorElement,
	Button,
	CurrencyIcon,
	DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerIngredients.module.css";
import { useState } from "react";
import Modal from "../../components/modal/Modal.jsx";
import PropTypes from "prop-types";

export default function BurgerIngredients({ data }) {
	const [openModal, setOpenModal] = useState(false);
	const [modalInfo, setModalInfo] = useState("");

	const elements = data.filter((item) => item.type !== "bun");
	const someBun = data.filter((item) => item.type === "bun");

	function closeModal(evt) {
		setOpenModal(false);
	}

	function closeModalByEscape(evt) {
		if (evt.key === "Escape") {
			closeModal();
		}
	}

	document.addEventListener("keydown", (evt) => {
		closeModalByEscape(evt);
	});

	return (
		<section className={styles.section}>
			<div
				className={styles.list}
				style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
				<div
					className={styles.elementTop}
					onClick={() => {
						setOpenModal(true);
						setModalInfo(someBun[0]);
					}}>
					<ConstructorElement
						type="top"
						isLocked={true}
						id={someBun[0]._id}
						key={someBun[0]._id}
						text={someBun[0].name}
						price={someBun[0].price}
						thumbnail={someBun[0].image}
					/>
				</div>

				<div
					className={styles.scrollbar}
					style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
					{elements.map((element) => (
						<div
							className={styles.element}
							onClick={() => {
								setOpenModal(true);
								setModalInfo(element);
							}}>
							<DragIcon type="primary" />
							<ConstructorElement
								id={element._id}
								key={element._id}
								text={element.name}
								price={element.price}
								thumbnail={element.image}
							/>
						</div>
					))}
				</div>
				<div
					className={styles.elementBottom}
					onClick={() => {
						setOpenModal(true);
						setModalInfo(someBun[0]);
					}}>
					<ConstructorElement
						id={someBun[0]._id}
						key={someBun[0]._id}
						type="bottom"
						isLocked={true}
						text={someBun[0].name}
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
						setOpenModal(true);
						setModalInfo("Order");
					}}>
					<div className={styles.but}>
						{" "}
						<Button htmlType="button" type="primary" size="large">
							Оформить заказ
						</Button>
					</div>
				</div>
			</div>

			<Modal open={openModal} onClose={closeModal} modalInfo={modalInfo} />
		</section>
	);
}

BurgerIngredients.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
