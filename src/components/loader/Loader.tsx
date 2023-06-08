import styles from "./loader.module.css";
export function Loader() {
	return (
		<div className={styles.wrapper}>
			<button>
				Loading ...
				<svg>
					<rect x="1" y="1"></rect>
				</svg>
			</button>
		</div>
	);
}
