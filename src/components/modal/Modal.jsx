import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/ModalOverlay";
import { createPortal } from "react-dom";
import { PropTypes } from "prop-types";
import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../services/actions/app";
const portalModalOverLay = document.querySelector("#portalOverlay");

export default function Modal({ headerText = "", children }) {
	const dispatch = useDispatch();

	const closePopup = useCallback(() => {
		dispatch(closeModal());
	});

	useEffect(() => {
		function closeModalByEscape(evt) {
			if (evt.key === "Escape") {
				closePopup();
			}
		}
		document.addEventListener("keydown", closeModalByEscape);
		return () => {
			document.removeEventListener("keydown", closeModalByEscape);
		};
	}, [closePopup]);

	return createPortal(
		<ModalOverlay onClose={closePopup}>
			<div className={styles.form}>
				<div>
					<h2
						className={
							styles.h2 + " text text_type_main-medium pt-10 pl-10 pr-10"
						}>
						{headerText}
						<div className={styles.cross} onClick={closePopup}>
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
	headerText: PropTypes.string,
	children: PropTypes.element.isRequired,
};
