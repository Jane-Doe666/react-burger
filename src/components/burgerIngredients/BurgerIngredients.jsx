import {
	ConstructorElement,
	Button,
	CurrencyIcon,
	DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerIngredients.module.css";
import { useState } from "react";
import Modal from "../../components/modal/Modal.jsx";

export default function BurgerIngredients({ data }) {
	const [openModal, setOpenModal] = useState(false);
	const [modalInfo, setModalInfo] = useState("");

	function closeModal() {
		setOpenModal(false);
	}

	const elements = data.filter((item) => item.type !== "bun");
	const someBun = data.filter((item) => item.type === "bun");

	return (
		<section className={styles.section}>
			<div
				className={styles.list}
				style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
				<div className={styles.elementTop}>
					<ConstructorElement
						type="top"
						isLocked={true}
						text={someBun[0].name}
						price={someBun[0].price}
						thumbnail={someBun[0].image}
						onClick={() => {
							setOpenModal(true);
							setModalInfo(someBun[0]);
						}}
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
				<div className={styles.elementBottom}>
					<ConstructorElement
						type="bottom"
						isLocked={true}
						text={someBun[0].name}
						price={someBun[0].price}
						thumbnail={someBun[0].image}
					/>
				</div>
			</div>

			<div className={styles.total + " mt-10 mr-4"}>
				<span className={styles.span + " text text_type_digits-medium mr-2"}>
					666
				</span>
				<CurrencyIcon type="primary" />

				<div
					className={styles.button + " ml-10"}
					onClick={() => {
						setOpenModal(true);
						setModalInfo("Order");
					}}>
					<Button htmlType="button" type="primary" size="large">
						Оформить заказ
					</Button>
				</div>
			</div>

			<Modal open={openModal} onClose={closeModal} modalInfo={modalInfo} />
		</section>
	);
}
