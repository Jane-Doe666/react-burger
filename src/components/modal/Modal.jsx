import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlayTest from "../modal-overlay/ModalOverlayTest";
import { createPortal } from "react-dom";
import OrderDetails from "../order-details/OrderDetails";
import IngredientDetails from "../ingredient-details/IngredientDetails";
const portalModalOverLay = document.querySelector("#portalOverlay");

export default function Modal({ open, onClose, modalInfo }) {
	console.log(modalInfo);
	const headerText = modalInfo === "Order" ? "" : "Детали ингредиента";
	if (open) {
		return createPortal(
			<ModalOverlayTest>
				<div className={styles.form}>
					<div>
						<h2
							className={
								styles.h2 + " text text_type_main-medium pt-10 pl-10 pr-10"
							}>
							{headerText}
							<div className={styles.cross} onClick={onClose}>
								<CloseIcon type="primary" />
							</div>
						</h2>
						<>
							{modalInfo === "Order" ? (
								<div>
									<OrderDetails />
								</div>
							) : (
								<div>
									<IngredientDetails details={modalInfo} />
								</div>
							)}
						</>
					</div>
				</div>
			</ModalOverlayTest>,
			portalModalOverLay
		);
	}
	return null;
}
