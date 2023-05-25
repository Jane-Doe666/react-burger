import { useEffect } from "react";
import styles from "../../app.module.css";
import BurgerIngredients from "../../../burgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../../burger-constructor/Burger-constructor";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../../../services/actions/app";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function Main() {
	const dispatch = useDispatch();
	const data = useSelector((state) => state.app.items);

	useEffect(() => {
		dispatch(getIngredients());
	}, [dispatch]);

	return (
		<>
			{data.isLoading ? (
				<h2>...is loading</h2>
			) : (
				<main className={styles.main}>
					<DndProvider backend={HTML5Backend}>
						<BurgerIngredients data={data} />
						<BurgerConstructor />
					</DndProvider>
				</main>
			)}
		</>
	);
}

export default Main;
