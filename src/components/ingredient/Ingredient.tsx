import {
	CurrencyIcon,
	Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";
import { useDrag } from "react-dnd";
import { counterByIdSelectorCreator } from "../../services/selectors/selector";
import { FC } from "react";
import { TElement } from "../../services/utile/types";
import { useAppSelector } from "../../services/utile/typesRedux";

type TIngredientProps = {
	item: TElement;
	id: String;
	onClick: React.MouseEventHandler<HTMLLIElement>;
};

export const Ingredient: FC<TIngredientProps> = ({ item, id, onClick }) => {
	const counterById = useAppSelector((state) =>
		counterByIdSelectorCreator(state.burgerConstructor)
	);
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
					<img ref={dragRef} src={item.image} alt="картинка ингредиента" />
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
};
