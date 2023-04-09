import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";
import PropTypes from "prop-types";

export default function Ingredient(props) {
	const element = props.item;
	const elementId = props.item._id;

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

Ingredient.ReactPropTypes = {
	elementId: PropTypes.string.isRequired,
	element: PropTypes.object.isRequired,
};
