import styles from "./ingredientDetails.module.css";

export default function IngredientDetails({ details }) {
	const {
		calories,
		carbohydrates,
		fat,
		proteins,
		name,
		image_large: image,
	} = details;
	return (
		<div className={styles.form}>
			<div>
				<img src={image} alt="picture dnld"></img>
				<p className={styles.productName + " text text_type_main-default mt-4"}>
					{name}
				</p>
				<ul
					className={styles.calories + " text text_type_main-small mt-8 pb-15"}>
					<li>
						<p className={styles.p}>Калории,ккал </p>
						<span className="text text_type_digits-default">{calories}</span>
					</li>
					<li>
						<p className={styles.p}>Белки, г</p>
						<span className="text text_type_digits-default">{proteins}</span>
					</li>
					<li>
						<p className={styles.p}>Жиры, г</p>
						<span className="text text_type_digits-default">{fat}</span>
					</li>
					<li>
						<p className={styles.p}>Углеводы, г </p>
						<span className="text text_type_digits-default">
							{carbohydrates}
						</span>
					</li>
				</ul>
			</div>
		</div>
	);
}
