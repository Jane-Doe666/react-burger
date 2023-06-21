import { Link } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./orders.module.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { socketMiddlewareOrders } from "../../services/actions/socketMiddlewareOrders";

export function Orders() {
	const dispatch = useDispatch();
	const ws = new WebSocket("wss://norma.nomoreparties.space/orders/all");
	console.log(ws.readyState);

	useEffect(() => {
		dispatch(socketMiddlewareOrders(ws));
	}, []);

	ws.onopen = (event) => {
		console.log("Соединение установлено");
		console.log(event.type);
	};

	ws.onmessage = (event) => {
		const userMessage = event.data;
		console.log(userMessage); // {id: 1, name: 'Иванов Василий', message: 'Привет, дома? Пришли показатели счётчиков, срочно!'}
	};

	return (
		<div className={styles.app}>
			<h1 className={styles.h2 + ` text text_type_main-large pt-10 pb-5`}>
				Лента заказов
			</h1>
			<div className={styles.main}>
				<Link className={styles.Link + " mb-4"} to="/feed/:id">
					<div className={styles.order + " mt-6"}>
						<p className="text text_type_digits-default">#0536553</p>
						<p className={"text text_type_main-default text_color_inactive"}>
							Сегодня, 16:20
						</p>
					</div>
					<p className="text text_type_main-medium mt-6">
						Death Star Burger Main
					</p>
					<div className={styles.images}>
						{" "}
						<div>!!! images !!!</div>{" "}
						<div className={styles.total + " mt-6"}>
							<div className="text text_type_digits-default pl-6 mr-2">480</div>
							<CurrencyIcon type="primary" />
						</div>
					</div>
				</Link>

				<div>
					<div className={styles.orderStatus}>
						<div>
							<h2 className="text text_type_main-medium mb-6">Готовы:</h2>
							<ul className={styles.ready + " text text_type_digits-default"}>
								<li className="mb-2">11111</li>
								<li className="mb-2">22222</li>
								<li className="mb-2">33333</li>
								<li className="mb-2">44444</li>
								<li className="mb-2">55555</li>
							</ul>
						</div>

						<div>
							<h2 className="text text_type_main-medium mb-6">В работе:</h2>
							<ul
								className={
									styles.inProgress + " text text_type_digits-default"
								}>
								<li className="mb-2">11111</li>
								<li className="mb-2">22222</li>
								<li className="mb-2">33333</li>
								<li className="mb-2">44444</li>
								<li className="mb-2">55555</li>
							</ul>
						</div>
					</div>
					<div className="text text_type_main-medium mt-15">
						Выполнено за все время:
					</div>
					<div className="text text_type_digits-large">28752</div>
					<div className="text text_type_main-medium mt-15">
						Выполнено за сегодня:
					</div>
					<div className="text text_type_digits-large">138</div>
				</div>
			</div>
		</div>
	);
}
