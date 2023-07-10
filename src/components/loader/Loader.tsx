import styles from "./loader.module.css";
import { Circles } from "react-loader-spinner";

export function Loader() {
	return (
		<div className={styles.box}>
			<Circles />
			<p className={styles.loader + " text text_type_main-default"}>
				Please wait...
			</p>
		</div>
	);
}
