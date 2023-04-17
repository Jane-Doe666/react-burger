import { useEffect } from "react";
import styles from "./app.module.css";
import BurgerIngredients from "../burgerIngredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/Burger-constructor";
import AppHeader from "../header/AppHeader";
import { useDispatch, useSelector } from "react-redux";
import { getDataIngredients } from "../../services/actions/app";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
	const dispatch = useDispatch();
	const data = useSelector((state) => state.app);

	useEffect(() => {
		dispatch(getDataIngredients());
	}, [dispatch]);

	return (
		<>
			{data.isLoading ? (
				<h2>...is loading</h2>
			) : (
				<div className={styles.App}>
					<AppHeader />
					<main className={styles.main}>
						<DndProvider backend={HTML5Backend}>
							<BurgerIngredients data={data.data} />
							<BurgerConstructor data={data.data} />
						</DndProvider>
					</main>
				</div>
			)}
		</>
	);
}

export default App;
