import styles from "./modalOverlay.module.css";
import PropTypes from "prop-types";
import { FC, ReactNode } from "react";

type TModalOverlay = {
	children: ReactNode;
	onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const ModalOverlay: FC<TModalOverlay> = ({ children, onClick }) => {
	function closeByOverlay(evt: any) {
		if (evt.target === evt.currentTarget) onClick(evt);
	}

	return (
		<div className={styles.modalOverlay} onClick={closeByOverlay}>
			{children}
		</div>
	);
};
