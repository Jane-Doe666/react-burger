import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import Ingredient from "../ingredient/Ingredient";
import styles from "./burgerConstructor.module.css";

export default function BurgerConstructor(props) {
	// console.log(5, props.data);
	const [current, setCurrent] = useState("one");
	const elements = props.data;
	const arrayBun = elements.filter((item) => item.type === "bun");
	const arrayMain = elements.filter((item) => item.type === "main");
	const arraySouse = elements.filter((item) => item.type === "sauce");
	// console.log(1, arrayBun);

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
							return <Ingredient item={item} key={item._id} />;
						})}
					</ul>
				</div>
				<div className={styles.div}>
					<h2 className={styles.h2 + ` text text_type_main-medium pt-10 pb-5`}>
						Соусы
					</h2>
					<ul className={styles.ul}>
						{arraySouse.map((item) => {
							return <Ingredient item={item} key={item._id} />;
						})}
					</ul>
				</div>
				<div className={styles.div}>
					<h2 className={styles.h2 + ` text text_type_main-medium pt-10 pb-5`}>
						Начинки
					</h2>
					<ul className={styles.ul}>
						{arrayMain.map((item) => {
							return <Ingredient item={item} key={item._id} />;
						})}
					</ul>
				</div>
			</div>
		</section>
	);
}

// Соусы
//         </p>
//         <div className={stylesBurgerIngredients.chapter + ' mt-6 ml-4'}>
//           {sauceArray.map((item: TItem) => (
//             <Ingredient item={item} key={item._id} onModalOpen={onModalOpen} />
//           ))}
//         </div>
//         <p
//           id="main"
//           className={
//             stylesBurgerIngredients.chapterLabel +
//             ' mt-10 text text_type_main-medium'
//           }
//         ></p>
