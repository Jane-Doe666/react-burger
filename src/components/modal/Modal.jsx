import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/ModalOverlay";
import { createPortal } from "react-dom";
import OrderDetails from "../order-details/OrderDetails";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import { PropTypes } from "prop-types";
const portalModalOverLay = document.querySelector("#portalOverlay");

export default function Modal({ open, onClose, modalInfo }) {
	const headerText = modalInfo === "Order" ? "" : "Детали ингредиента";

	if (open) {
		return createPortal(
			<ModalOverlay onClose={onClose}>
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
			</ModalOverlay>,
			portalModalOverLay
		);
	}
	return null;
}

Modal.propTypes = {
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	modalInfo: PropTypes.any.isRequired,
};
