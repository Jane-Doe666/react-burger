import styles from "./modalOverlay.module.css";
import PropTypes from "prop-types";
import { FC, ReactNode } from "react";

type TModalOverlay = {
	children: ReactNode;
	onClose: Function;
};

export const ModalOverlay: FC<TModalOverlay> = ({ children, onClose }) => {
	function closeByOverlay(evt: any) {
		if (evt.target === evt.currentTarget) onClose();
	}

	return (
		<div className={styles.modalOverlay} onClick={closeByOverlay}>
			{children}
		</div>
	);
};
