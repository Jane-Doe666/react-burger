import styles from "./modalOverlay.module.css";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export default function ModalOverlay({ children }) {
	function check() {
		const x = document.querySelector("#Modal");
		console.log(44, x);
	}
	return (
		<div
			id={"modalOverlay"}
			className={styles.modalOverlay}
			onClick={(e) => {
				console.log(2, e.nativeEvent.currentTarget);
				console.log(2, e.target);
				check();
			}}>
			{children}
		</div>
	);
}

ModalOverlay.propTypes = {
	children: PropTypes.element.isRequired,
};
