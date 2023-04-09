import styles from "./modalOverlay.module.css";

export default function ModalOverlayTest(props) {
	return <div className={styles.modalOverlay}>{props.children}</div>;
}
