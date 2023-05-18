import { useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../header/AppHeader";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/app";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import { NotFound404 } from "./pages/notfound";
import { Login } from "./pages/login/Login";
import { Registration } from "./pages/registration/Registration";
import { RestorePassword } from "./pages/restore-password/RestorePassword";

import { PasswordReset } from "./pages/password-reset/PasswordReset";
import { Profile } from "./pages/profile/Profile";
import { Orders } from "./pages/orders/Orders";

function App() {
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
				<div className={styles.App}>
					<BrowserRouter>
						<AppHeader />
						<Routes>
							<Route path="/" element={<Main />} />
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Registration />} />
							<Route path="/forgot-password" element={<RestorePassword />} />
							<Route path="/profile" element={<Profile />} />
							<Route path="/reset-password" element={<PasswordReset />} />
							<Route path="/profile/orders" element={<Orders />} />
							<Route path="*" element={<NotFound404 />} />
						</Routes>
					</BrowserRouter>
				</div>
			)}
		</>
	);
}

export default App;
