import { useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../header/AppHeader";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/app";
import { Route, Routes, useLocation } from "react-router-dom";
import Main from "./pages/main/main";
import { NotFound404 } from "./pages/notfound-page/notfound";
import { Login } from "./pages/login/Login";
import { Registration } from "./pages/registration/Registration";
import { RestorePassword } from "./pages/restore-password/RestorePassword";
import { PasswordReset } from "./pages/password-reset/PasswordReset";
import { Profile } from "./pages/profile/Profile";
import { Orders } from "./pages/orders/Orders";
import { ProtectedRoute } from "../HOC/ProtectedRoute";
import IngredientPage from "./pages/ingredient/IngredientPage";

function App() {
	const dispatch = useDispatch();
	const data = useSelector((state) => state.app.items);
	const { state } = useLocation();
	const location = useLocation();

	useEffect(() => {
		dispatch(getIngredients());
	}, [dispatch]);

	return (
		<>
			{data.isLoading ? (
				<h2>...is loading</h2>
			) : (
				<div className={styles.App}>
					<AppHeader />
					<Routes location={state ? "/" : location}>
						<Route path="/" element={<Main />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Registration />} />
						<Route path="/forgot-password" element={<RestorePassword />} />
						<Route path="/reset-password" element={<PasswordReset />} />
						<Route path="*" element={<NotFound404 />} />
						<Route
							path="/profile/orders"
							element={
								<ProtectedRoute>
									<Orders />
								</ProtectedRoute>
							}
						/>

						<Route
							path="/profile"
							element={
								<ProtectedRoute>
									<Profile />
								</ProtectedRoute>
							}
						/>
						<Route path="/ingredients/:id" element={<IngredientPage />} />
					</Routes>
				</div>
			)}
		</>
	);
}

export default App;
