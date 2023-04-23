import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef, useState } from "react";
import Ingredient from "../ingredient/Ingredient";
import styles from "./burgerIngredients.module.css";
import Modal from "../modal/Modal";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_INGREDIENT } from "../../services/reducers/ingredientDetails";

export default function BurgerIngredients(props) {
	const dispatch = useDispatch();
	const dataForModal = useSelector((state) => state.ingredientDetails.info);
	const openedModal = useSelector((state) => state.ingredientDetails.setModal);
	const openIngredient = (item) => {
		dispatch({ type: OPEN_INGREDIENT, info: item });
	};
	const elements = props.data.map(
		(item) => (item = { ...item, key: item._id })
	);
	const arrayBun = elements.filter((item) => item.type === "bun");
	const arrayMain = elements.filter((item) => item.type === "main");
	const arraySouse = elements.filter((item) => item.type === "sauce");

	const scrollConainer = useRef();
	const currentOne = useRef();
	const currentTwo = useRef();
	const currentThree = useRef();

	const [current, setCurrent] = useState("one");

	useEffect(() => {
		current === "one" &&
			currentOne.current.scrollIntoView({ behavior: "smooth" });
		current === "two" &&
			currentTwo.current.scrollIntoView({ behavior: "smooth" });
		current === "three" &&
			currentThree.current.scrollIntoView({ behavior: "smooth" });
	});

	//scrollTop
	//offSet

	//litcode
	//теория алгор

	function handleScroll() {
		const topConainerScroll =
			scrollConainer.current.getBoundingClientRect().top;
		const bottomBun = currentOne.current.getBoundingClientRect().bottom;
		const bottomSouse = currentTwo.current.getBoundingClientRect().bottom;

		if (bottomSouse <= topConainerScroll) {
			setCurrent("three");
		} else if (bottomBun <= topConainerScroll) {
			setCurrent("two");
		} else {
			setCurrent("one");
		}
	}

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

			<div
				className={styles.scrollbar}
				onScroll={handleScroll}
				ref={scrollConainer}>
				<div className={styles.div}>
					<h2 className={styles.h2 + ` text text_type_main-medium pb-5`}>
						Булки
					</h2>
					<ul className={styles.ul} ref={currentOne}>
						{arrayBun.map((item) => {
							return (
								<div className={styles.div}>
									<Ingredient
										item={item}
										key={item.key}
										id={item._id}
										onClick={() => {
											openIngredient(item);
										}}
									/>
								</div>
							);
						})}
					</ul>
				</div>
				<div className={styles.div}>
					<h2 className={styles.h2 + ` text text_type_main-medium pt-10 pb-5`}>
						Соусы
					</h2>
					<ul className={styles.ul} ref={currentTwo}>
						{arraySouse.map((item) => {
							return (
								<Ingredient
									item={item}
									key={item.key}
									id={item._id}
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
					<ul className={styles.ul} ref={currentThree}>
						{arrayMain.map((item) => {
							return (
								<Ingredient
									item={item}
									key={item.key}
									id={item._id}
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
						<IngredientDetails details={dataForModal} />
					</Modal>
				)}
			</>
		</section>
	);
}

BurgerIngredients.propTypes = {
	data: PropTypes.array.isRequired,
};
