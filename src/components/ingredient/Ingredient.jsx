import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";
import PropTypes from "prop-types";

export default function Ingredient({ item, id, onClick }) {
	return (
		<li className={styles.li} id={id} onClick={onClick}>
			<img src={item.image} alt="картинка ингредиента" />

			<div className={styles.div}>
				<p className="text text_type_digits-default mt-1 mr-1 mb-1">
					{item.price}
				</p>
				<CurrencyIcon type="primary" />
			</div>

			<p className="text text_type_main-default">{item.name}</p>
		</li>
	);
}

Ingredient.ReactPropTypes = {
	item: PropTypes.object.isRequired,
	id: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};
