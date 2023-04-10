import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/ModalOverlay";
import { createPortal } from "react-dom";
import { PropTypes } from "prop-types";
import { useState, useEffect } from "react";
const portalModalOverLay = document.querySelector("#portalOverlay");

export default function Modal({ onClose, headerText = "", children }) {
	const [modal, setModal] = useState("");

	function changeModal() {
		setModal("Modal");
	}

	useEffect(() => {
		document.addEventListener("keydown", (evt) => {
			closeModalByEscape(evt);
		});
	});

	function closeModalByEscape(evt) {
		if (evt.key === "Escape") {
			onClose();
		}
	}

	return createPortal(
		<ModalOverlay onClose={onClose}>
			<div
				id={"Modal"}
				// onClick={(e) => {
				// 	console.log(1, e.target);
				// }}
				className={styles.form}>
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
					{children}
				</div>
			</div>
		</ModalOverlay>,
		portalModalOverLay
	);
}

Modal.propTypes = {
	// open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	headerText: PropTypes.oneOf(["", "Детали ингредиента"]),
	children: PropTypes.element.isRequired,
};
