import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { createPortal } from "react-dom";

import React, { FC, ReactNode, useEffect } from "react";
import { ModalOverlay } from "../modal-overlay/ModalOverlay";

const portalModalOverLay = document.querySelector(
	"#portalOverlay"
) as HTMLElement;

type TModal = {
	children: ReactNode;
	handleClose: (
		event: React.MouseEvent<HTMLDivElement, MouseEvent> | null
	) => void;
	headerText?: string;
};

export const Modal: FC<TModal> = ({ headerText, children, handleClose }) => {
	useEffect(() => {
		function closeModalByEscape(evt: KeyboardEvent) {
			evt.stopPropagation();
			if (evt.key === "Escape") {
				handleClose(null);
			}
		}
		document.addEventListener("keydown", closeModalByEscape);
		return () => {
			document.removeEventListener("keydown", closeModalByEscape);
		};
	}, [handleClose]);

	return createPortal(
		<ModalOverlay onClick={handleClose}>
			<div className={styles.form}>
				<div>
					<h2
						className={
							styles.h2 + " text text_type_main-medium pt-10 pl-10 pr-10"
						}>
						{headerText}
						<div className={styles.cross} onClick={handleClose}>
							<CloseIcon type="primary" />
						</div>
					</h2>
					{children}
				</div>
			</div>
		</ModalOverlay>,
		portalModalOverLay
	);
};
