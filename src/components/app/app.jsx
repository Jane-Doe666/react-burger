import React, { useEffect, useState } from "react";
import styles from "./app.module.css";
import BurgerIngredientsRight from "../burgerIngredients/BurgerIngredients";
import BurgerIngredients from "../burger-constructor/Burger-constructor";
import AppHeader from "../header/AppHeader";
const burgerURL = "https://norma.nomoreparties.space/api/ingredients";

function App() {
	const [state, setState] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getStateData = async function () {
			try {
				const res = await fetch(burgerURL);
				const result = await res.json();
				setState(result.data);
				setIsLoading(false);
			} catch (err) {
				console.log("Err");
			}
		};
		getStateData();
	}, []);

	return (
		<>
			{isLoading ? (
				<h2>...is loading</h2>
			) : (
				<div className={styles.App}>
					<AppHeader />
					<main className={styles.main}>
						<BurgerIngredientsRight data={state} />
						<BurgerIngredients data={state} />
					</main>
				</div>
			)}
		</>
	);
}

export default App;
