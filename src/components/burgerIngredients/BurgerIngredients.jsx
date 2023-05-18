import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef, useState } from "react";
import Ingredient from "../ingredient/Ingredient";
import styles from "./burgerIngredients.module.css";
import Modal from "../modal/Modal";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import { useDispatch, useSelector } from "react-redux";
import { openIngredientInfo } from "../../services/actions/ingredientDetails";
import { useInView } from "react-intersection-observer";

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

	const [current, setCurrent] = useState("one");
	const sectionOne = useRef();
	const sectionTwo = useRef();
	const sectionThree = useRef();

	const [refOne, inViewOne] = useInView({ threshold: 0.5 });
	const [refTwo, inViewTwo] = useInView({ threshold: 0.5 });
	const [refThree, inViewThree] = useInView({ threshold: 0 });

	useEffect(() => {
		inViewOne
			? setCurrent("one")
			: inViewTwo
			? setCurrent("two")
			: inViewThree
			? setCurrent("three")
			: setCurrent("one");
	}, [inViewOne, inViewTwo, inViewThree]);

	function handleClick(section, activeState) {
		setCurrent(activeState);
		section.current.scrollIntoView({ behavior: "smooth", block: "start" });
	}

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
						handleClick(sectionOne, "one");
					}}>
					Булки
				</Tab>
				<Tab
					value="two"
					active={current === "two"}
					onClick={() => {
						handleClick(sectionTwo, "two");
					}}>
					Соусы
				</Tab>{" "}
				<Tab
					href="three"
					value="three"
					active={current === "three"}
					onClick={() => {
						handleClick(sectionThree, "three");
					}}>
					Начинки
				</Tab>
			</nav>

			<div className={styles.scrollbar}>
				<div className={styles.div}>
					<h2
						className={styles.h2 + ` text h2_1 text_type_main-medium pb-5`}
						ref={sectionOne}>
						Булки
					</h2>
					<ul className={styles.ul} ref={refOne}>
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
					<h2
						className={styles.h2 + ` text text_type_main-medium pt-10 pb-5`}
						ref={sectionTwo}>
						Соусы
					</h2>
					<ul className={styles.ul} ref={refTwo}>
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
					<h2
						className={styles.h2 + ` text text_type_main-medium pt-10 pb-5`}
						ref={sectionThree}>
						Начинки
					</h2>
					<ul className={styles.ul} ref={refThree}>
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
