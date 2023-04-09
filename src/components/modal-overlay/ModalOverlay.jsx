import styles from "./modalOverlay.module.css";
import PropTypes from "prop-types";

export default function ModalOverlay({ onClose, children }) {
	return (
		<div onClick={onClose} className={styles.modalOverlay}>
			{children}
		</div>
	);
}

ModalOverlay.propTypes = {
	onClose: PropTypes.func.isRequired,
	children: PropTypes.element.isRequired,
};
