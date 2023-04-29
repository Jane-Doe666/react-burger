import styles from "./modalOverlay.module.css";
import PropTypes from "prop-types";

export default function ModalOverlay({ children, onClose }) {
	function closeByOverlay(evt) {
		if (evt.target === evt.currentTarget) onClose();
	}

	return (
		<div className={styles.modalOverlay} onClick={closeByOverlay}>
			{children}
		</div>
	);
}

ModalOverlay.propTypes = {
	children: PropTypes.element.isRequired,
	onClose: PropTypes.func.isRequired,
};
