import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef, useState } from "react";
import styles from "./burgerIngredients.module.css";
import { useDispatch, useSelector } from "react-redux";
import { openIngredientInfo } from "../../services/actions/ingredientDetails";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { TElement } from "../../services/types/types";
import { Ingredient } from "../ingredient/Ingredient";
import { useAppSelector } from "../../services/types/typesRedux";

export default function BurgerIngredients() {
	type TActiveState = "one" | "two" | "three";
	const dispatch = useDispatch();
	const data = useAppSelector((state) => state.app.items);
	const openIngredient = (item: TElement) => {
		dispatch(openIngredientInfo(item));
	};

	const elements = data.map(
		(item: TElement) => (item = { ...item, key: item._id })
	);
	const arrayBun = elements.filter((item: TElement) => item.type === "bun");
	const arrayMain = elements.filter((item: TElement) => item.type === "main");
	const arraySouse = elements.filter((item: TElement) => item.type === "sauce");

	const [current, setCurrent] = useState("one");
	const sectionOne = useRef<HTMLDivElement>(null);
	const sectionTwo = useRef<HTMLDivElement>(null);
	const sectionThree = useRef<HTMLDivElement>(null);

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

	function handleClick(
		section: React.RefObject<HTMLDivElement> | null,
		activeState: TActiveState
	) {
		setCurrent(activeState);
		section?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
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
						{arrayBun.map((item: TElement) => {
							return (
								<Link
									to={{
										pathname: `/ingredients/${item._id}`,
									}}
									state={{
										state: { modal: true },
										background: "/",
									}}
									className={styles.div}
									key={item._id}>
									<Ingredient
										item={item}
										id={item._id}
										onClick={() => {
											openIngredient(item);
										}}
									/>
								</Link>
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
						{arraySouse.map((item: TElement) => {
							return (
								<Link
									to={{
										pathname: `/ingredients/${item._id}`,
									}}
									state={{
										state: { modal: true },
									}}
									className={styles.div}
									key={item._id}>
									<Ingredient
										item={item}
										id={item._id}
										onClick={() => {
											openIngredient(item);
										}}
									/>
								</Link>
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
						{arrayMain.map((item: TElement) => {
							return (
								<Link
									className={styles.div}
									key={item._id}
									to={{
										pathname: `/ingredients/${item._id}`,
									}}
									state={{
										state: { modal: true },
									}}>
									<Ingredient
										item={item}
										id={item._id}
										onClick={() => {
											openIngredient(item);
										}}
									/>
								</Link>
							);
						})}
					</ul>
				</div>
			</div>
		</section>
	);
}
