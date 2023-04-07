import {
	Box,
	CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";

export default function Ingredient(props) {
	const element = props.item;
	const elementId = props.item._id;

	// console.log(666, props);
	return (
		<li id={elementId}>
			<img src={element.image} alt="element" />

			<div className={styles.div}>
				<p className="text text_type_digits-default mt-1 mr-1 mb-1">
					{element.price}
				</p>
				<CurrencyIcon type="primary" />
			</div>

			<p className="text text_type_main-default">{element.name}</p>
		</li>
	);
}
