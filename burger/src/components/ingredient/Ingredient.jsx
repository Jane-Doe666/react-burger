import {
	CurrencyIcon,
	Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { counterByIdSelectorCreator } from "../../services/selectors/selector";

export default function Ingredient({ item, id, onClick }) {
	const counterById = useSelector((state) => counterByIdSelectorCreator(state));
	const [, dragRef] = useDrag({
		type: "ingredient",
		item: { id },
	});

	return (
		<>
			<li className={styles.li} onClick={onClick}>
				{counterById
					.filter((item) => item.id === id)
					.map((item, index) => (
						<div className={styles.counter} key={index}>
							<Counter count={item.count} size="default" extraClass="m-1" />
						</div>
					))}
				<div>
					{" "}
					<img ref={dragRef} src={item.image} alt={item.name} />
					<div className={styles.div}>
						<p className="text text_type_digits-default mt-1 mr-1 mb-1">
							{item.price}
						</p>
						<CurrencyIcon type="primary" />
					</div>
				</div>

				<p className="text text_type_main-default">{item.name}</p>
			</li>
		</>
	);
}

Ingredient.ReactPropTypes = {
	item: PropTypes.object.isRequired,
	id: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};
