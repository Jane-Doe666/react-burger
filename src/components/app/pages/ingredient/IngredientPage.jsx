import styles from "../../../ingredient-details/ingredientDetails.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function IngredientPage() {
	const ingredients = useSelector((state) => state.app.items);
	const { id } = useParams();

	const data = useSelector((state) =>
		ingredients.find((item) => item._id === id)
	);
	let details = useSelector((state) => state.ingredientDetails.info);
	details = details === undefined ? (details = data) : details;

	return details === undefined ? (
		<div>Loader ingredient.....</div>
	) : (
		<div>
			<img
				className={styles.image}
				src={details.image_large}
				alt={details.name}></img>
			<p className={styles.productName + " text text_type_main-default mt-4"}>
				{details.name}
			</p>
			<ul className={styles.calories + " text text_type_main-small mt-8 pb-15"}>
				<li>
					<p className={styles.p}>Калории, ккал </p>
					<span className="text text_type_digits-default">
						{details.calories}
					</span>
				</li>
				<li>
					<p className={styles.p}>Белки, г</p>
					<span className="text text_type_digits-default">
						{details.proteins}
					</span>
				</li>
				<li>
					<p className={styles.p}>Жиры, г</p>
					<span className="text text_type_digits-default">{details.fat}</span>
				</li>
				<li>
					<p className={styles.p}>Углеводы, г </p>
					<span className="text text_type_digits-default">
						{details.carbohydrates}
					</span>
				</li>
			</ul>
		</div>
	);
}
