import { useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../components/header/AppHeader";
import { useDispatch } from "react-redux";
import { getIngredients } from "../services/actions/app";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Main from "../pages/main/main";
import { NotFound404 } from "../pages/notfound-page/notfound";
import { Login } from "../pages/login/Login";
import { Registration } from "../pages/registration/Registration";
import { RestorePassword } from "../pages/restore-password/RestorePassword";
import { PasswordReset } from "../pages/password-reset/PasswordReset";
import { Profile } from "../pages/profile/Profile";
import { ProtectedRoute } from "../components/HOC/ProtectedRoute";
import IngredientDetails from "../components/ingredient-details/IngredientDetails";
import { checkAuth } from "../services/actions/user";
import { Modal } from "../components/modal/Modal";
import { OrderFeedById } from "../pages/order/OrderFeedById";
import { OrderProfileById } from "../pages/order/OrderProfileById";
import { useAppSelector } from "../services/types/typesRedux";
import { OrdersPublic } from "../pages/orders-public/OrdersPublic";
import { OrdersPrivate } from "../pages/orders-private/OrdersPrivate";

function App() {
	const dispatch = useDispatch();
	const isLoading = useAppSelector((state) => state.app.isLoading);
	const { state } = useLocation();
	const location = useLocation();
	const navigate = useNavigate();
	const background = location?.state?.background;

	const handleClose = () => {
		navigate(-1);
	};

	useEffect(() => {
		dispatch(getIngredients());
		dispatch(checkAuth());
	}, [dispatch]);

	return (
		<>
			{isLoading ? (
				<h2>...is loading</h2>
			) : (
				<div className={styles.App}>
					<AppHeader />
					<Routes location={background || location}>
						<Route path="/" element={<Main />} />
						<Route
							path="/login"
							element={
								<ProtectedRoute authOnly={false}>
									<Login />
								</ProtectedRoute>
							}
						/>
						<Route path="/register" element={<Registration />} />
						<Route path="/forgot-password" element={<RestorePassword />} />
						<Route path="/reset-password" element={<PasswordReset />} />
						<Route path="*" element={<NotFound404 />} />
						<Route path="/feed" element={<OrdersPublic />} />
						<Route path="/feed/:id" element={<OrderFeedById />} />

						<Route
							path="/profile"
							element={
								<ProtectedRoute authOnly={true}>
									<Profile />
								</ProtectedRoute>
							}>
							<Route path="/profile/" element={<Profile />} />
							<Route path="/profile/orders" element={<OrdersPrivate />} />
						</Route>

						<Route
							path="/profile/orders/:id"
							element={
								<ProtectedRoute authOnly={true}>
									<OrderProfileById />
								</ProtectedRoute>
							}
						/>

						<Route path="/ingredients/:id" element={<IngredientDetails />} />
					</Routes>

					{state && (
						<Routes>
							<Route
								path="/ingredients/:id"
								element={
									<Modal
										handleClose={handleClose}
										headerText={"Детали ингридиента"}>
										<IngredientDetails />
									</Modal>
								}
							/>
							<Route
								path="/feed/:id"
								element={
									<Modal handleClose={handleClose}>
										<OrderFeedById />
									</Modal>
								}
							/>
							<Route
								path="/profile/orders/:id"
								element={
									<Modal handleClose={handleClose}>
										<OrderProfileById />
									</Modal>
								}
							/>
						</Routes>
					)}
				</div>
			)}
		</>
	);
}

export default App;
