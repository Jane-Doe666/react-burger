import { useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../components/header/AppHeader";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../services/actions/app";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Main from "../pages/main/main";
import { NotFound404 } from "../pages/notfound-page/notfound";
import { Login } from "../pages/login/Login";
import { Registration } from "../pages/registration/Registration";
import { RestorePassword } from "../pages/restore-password/RestorePassword";
import { PasswordReset } from "../pages/password-reset/PasswordReset";
import { Profile } from "../pages/profile/Profile";
import { Orders } from "../pages/orders/Orders";
import { ProtectedRoute } from "../components/HOC/ProtectedRoute";
import IngredientDetails from "../components/ingredient-details/IngredientDetails";
import { checkAuth } from "../services/actions/user";
import { Modal } from "../components/modal/Modal";
// import { OrdersProfile } from "../pages/orders-profile/OrdersProfile";
import { OrderFeedById } from "../pages/order/OrderFeedById";
import { OrdersProfile } from "../pages/orders-profile/OrdersProfile";

function App() {
	const dispatch: any = useDispatch();
	const data = useSelector((state: any) => state.app.items);
	const { state } = useLocation();
	const location = useLocation();
	const navigate = useNavigate();
	const modal = location?.state?.state?.modal;
	const background = location?.state?.background;
	// console.log(location);

	const handleClose: any = () => {
		navigate(-1);
	};

	useEffect(() => {
		dispatch(getIngredients());
		dispatch(checkAuth());
	}, [dispatch]);

	return (
		<>
			{data.isLoading ? (
				<h2>...is loading</h2>
			) : (
				<div className={styles.App}>
					<AppHeader />
					<Routes location={modal ? background : location}>
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
						<Route path="/feed" element={<Orders />} />
						<Route path="/feed/:id" element={<OrderFeedById />} />

						<Route
							path="/profile"
							element={
								<ProtectedRoute authOnly={true}>
									<Profile />
								</ProtectedRoute>
							}>
							<Route path="/profile/" element={<Profile />} />
							<Route path="/profile/orders" element={<OrdersProfile />} />
						</Route>

						<Route
							path="/profile/orders/:id"
							element={
								<ProtectedRoute authOnly={true}>
									<OrdersProfile />
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
						</Routes>
					)}

					{state && (
						<Routes>
							<Route
								path="/feed/:id"
								element={
									<Modal handleClose={handleClose}>
										<OrderFeedById />
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

//     <Route
//       path="/profile"
//       element={<ProtectedRouteElement element={<ProfilePage />} />}
//     >
//       <Route path="/profile/" element={<ProfileInputs />} />
//       <Route path="/profile/orders" element={<OrdersHistoryFeed />} />
//     </Route>
