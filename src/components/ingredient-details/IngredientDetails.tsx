import styles from "./ingredientDetails.module.css";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { TElement } from "../../services/utile/types";

export default function IngredientDetails() {
	const ingredients = useSelector((state: any) => state.app.items);
	const { id } = useParams();
	const location = useLocation();
	const data = ingredients.find((item: TElement) => item._id === id);

	let details = useSelector((state: any) => state.ingredientDetails.info);
	details = details === undefined ? (details = data) : details;

	return details === undefined ? (
		<div>Loader ingredient.....</div>
	) : (
		<div className={location.state === null ? "" : styles.form}>
			<div>
				<img
					className={styles.image}
					src={details.image_large}
					alt={details.name}></img>
				<p className={styles.productName + " text text_type_main-default mt-4"}>
					{details.name}
				</p>
				<ul
					className={styles.calories + " text text_type_main-small mt-8 pb-15"}>
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
		</div>
	);
}
