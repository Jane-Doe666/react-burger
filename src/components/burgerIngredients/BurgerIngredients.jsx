import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import Ingredient from "../ingredient/Ingredient";
import styles from "./burgerIngredients.module.css";
import Modal from "../modal/Modal";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_INGREDIENT } from "../../services/reducers/ingredientDetails";

export default function BurgerIngredients(props) {
	const dispatch = useDispatch();
	const data = useSelector((state) => state.ingredientDetails.info);
	const openedModal = useSelector((state) => state.ingredientDetails.setModal);

	const openIngredient = (item) => {
		dispatch({ type: OPEN_INGREDIENT, info: item });
	};

	const elements = props.data;
	const arrayBun = elements.filter((item) => item.type === "bun");
	const arrayMain = elements.filter((item) => item.type === "main");
	const arraySouse = elements.filter((item) => item.type === "sauce");

	const [current, setCurrent] = useState("one");

	return (
		<section className={styles.section}>
			<h2 className={styles.h2 + ` text text_type_main-large pt-10 pb-5`}>
				Соберите бургер
			</h2>
			<nav className={styles.nav + " mb-10"}>
				<Tab value="one" active={current === "one"} onClick={setCurrent}>
					Булки
				</Tab>
				<Tab value="two" active={current === "two"} onClick={setCurrent}>
					Соусы
				</Tab>
				<Tab value="three" active={current === "three"} onClick={setCurrent}>
					Начинки
				</Tab>
			</nav>
			<div className={styles.scrollbar}>
				<div className={styles.div}>
					<h2 className={styles.h2 + ` text text_type_main-medium pb-5`}>
						Булки
					</h2>
					<ul className={styles.ul}>
						{arrayBun.map((item) => {
							return (
								<Ingredient
									item={item}
									id={item._id}
									key={item._id}
									onClick={() => {
										openIngredient(item);
									}}
								/>
							);
						})}
					</ul>
				</div>
				<div className={styles.div}>
					<h2 className={styles.h2 + ` text text_type_main-medium pt-10 pb-5`}>
						Соусы
					</h2>
					<ul className={styles.ul}>
						{arraySouse.map((item) => {
							return (
								<Ingredient
									item={item}
									id={item._id}
									key={item._id}
									onClick={() => {
										openIngredient(item);
									}}
								/>
							);
						})}
					</ul>
				</div>
				<div className={styles.div}>
					<h2 className={styles.h2 + ` text text_type_main-medium pt-10 pb-5`}>
						Начинки
					</h2>
					<ul className={styles.ul}>
						{arrayMain.map((item) => {
							return (
								<Ingredient
									item={item}
									id={item._id}
									key={item._id}
									onClick={() => {
										openIngredient(item);
									}}
								/>
							);
						})}
					</ul>
				</div>
			</div>
			<>
				{openedModal && (
					<Modal headerText="Детали ингредиента">
						<IngredientDetails details={data} />
					</Modal>
				)}
			</>
		</section>
	);
}

BurgerIngredients.propTypes = {
	data: PropTypes.array.isRequired,
};
