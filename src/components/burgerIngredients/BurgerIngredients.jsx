import {
	ConstructorElement,
	Button,
	CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerIngredients.module.css";

export default function BurgerIngredients(props) {
	const elements = props.data.filter((item) => item.type !== "bun");
	const someBun = props.data.filter((item) => item.type === "bun");

	return (
		<section className={styles.section}>
			<div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
				<ConstructorElement
					type="top"
					isLocked={true}
					text={someBun[0].name}
					price={someBun[0].price}
					thumbnail={someBun[0].image}
				/>
				<div
					className={styles.scrollbar}
					style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
					{elements.map((element) => (
						<ConstructorElement
							id={element._id}
							key={element._id}
							text={element.name}
							price={element.price}
							thumbnail={element.image}
						/>
					))}
				</div>

				<ConstructorElement
					type="bottom"
					isLocked={true}
					text={someBun[0].name}
					price={someBun[0].price}
					thumbnail={someBun[0].image}
				/>
			</div>
			<div className={styles.total + " mt-10"}>
				<span className={styles.span + " text text_type_digits-medium mr-2"}>
					666
				</span>
				<CurrencyIcon type="primary" />
				<div className={styles.button + " ml-10"}>
					<Button htmlType="button" type="primary" size="large">
						Оформить заказ
					</Button>
				</div>
			</div>
		</section>
	);
}
