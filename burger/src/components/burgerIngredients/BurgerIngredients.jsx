import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef, useState } from "react";
import Ingredient from "../ingredient/Ingredient";
import styles from "./burgerIngredients.module.css";
import Modal from "../modal/Modal";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import { useDispatch, useSelector } from "react-redux";
import { openIngredientInfo } from "../../services/actions/ingredientDetails";
import { useInView, InView } from "react-intersection-observer";

export default function BurgerIngredients() {
	const dispatch = useDispatch();
	const data = useSelector((state) => state.app.items);
	const dataForModal = useSelector((state) => state.ingredientDetails.info);
	const openedModal = useSelector((state) => state.ingredientDetails.setModal);
	const openIngredient = (item) => {
		dispatch(openIngredientInfo(item));
	};
	const elements = data.map((item) => (item = { ...item, key: item._id }));
	const arrayBun = elements.filter((item) => item.type === "bun");
	const arrayMain = elements.filter((item) => item.type === "main");
	const arraySouse = elements.filter((item) => item.type === "sauce");

	const scrollConainer = useRef();
	const currentOne = useRef();
	const currentTwo = useRef();
	const currentThree = useRef();

	const [current, setCurrent] = useState("one");

	const handleScroll = () => {
		const topContainer = scrollConainer.current.getBoundingClientRect().top;
		const topSause = currentTwo.current.getBoundingClientRect().top;
		const topMain = currentThree.current.getBoundingClientRect().top;
		const diffSause = topContainer - topSause;
		const diffMain = topContainer - topMain;
		if (diffSause >= 0 && diffMain < 0) {
			setCurrent("two");
		} else if (diffMain >= 0) {
			setCurrent("three");
		} else {
			setCurrent("one");
		}
	};

	const handleClick = (elementRef, value) => {
		// console.log(elementRef);
		setCurrent(value);
		// elementRef.current.scrollIntoView({
		// 	/*block: "center",*/ behavior: "smooth",
		// });
	};

	return (
		<section className={styles.section}>
			<h2 className={styles.h2 + ` text text_type_main-large pt-10 pb-5`}>
				Соберите бургер
			</h2>
			<nav className={styles.nav + " mb-10"}>
				<Tab
					value="one"
					active={current === "one"}
					onClick={() => {
						handleClick(currentOne, "one");
					}}>
					Булки
				</Tab>
				<Tab
					value="two"
					active={current === "two"}
					onClick={() => {
						handleClick(currentTwo, "two");
					}}>
					Соусы
				</Tab>
				<Tab
					value="three"
					active={current === "three"}
					onClick={() => {
						handleClick(currentThree, "three");
					}}>
					Начинки
				</Tab>
			</nav>

			<div
				className={styles.scrollbar}
				onScroll={handleScroll}
				ref={scrollConainer}>
				<div className={styles.div}>
					<h2 className={styles.h2 + ` text h2_1 text_type_main-medium pb-5`}>
						Булки
					</h2>
					<ul className={styles.ul} ref={currentOne}>
						{arrayBun.map((item) => {
							return (
								<div className={styles.div} key={item._id}>
									<Ingredient
										item={item}
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
								<div className={styles.div} key={item._id}>
									<Ingredient
										item={item}
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
						Начинки
					</h2>
					<ul className={styles.ul} ref={currentThree}>
						{arrayMain.map((item) => {
							return (
								<div className={styles.div} key={item._id}>
									<Ingredient
										item={item}
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
