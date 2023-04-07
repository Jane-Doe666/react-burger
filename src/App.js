import React, { useEffect, useState } from "react";
import styles from "./App.css";
import BurgerConstructor from "./components/burger-constructor/BurgerConstructor";
import BurgerIngredients from "./components/burgerIngredients/BurgerIngredients";
import AppHeader from "./components/header/AppHeader";
const burgerURL = "https://norma.nomoreparties.space/api/ingredients";

function App() {
	const [state, setState] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getStateData = async () => {
			const res = await fetch(burgerURL);
			const result = await res.json();
			setState(result.data);
			setIsLoading(false);
			//add catch
		};
		getStateData();
	}, []);

	return (
		<>
			{isLoading ? (
				<h2>...is loading</h2>
			) : (
				<div className="App">
					<AppHeader />
					<main className="main">
						<BurgerConstructor data={state} />
						<BurgerIngredients data={state} />
					</main>
				</div>
			)}
		</>
	);
}

export default App;
