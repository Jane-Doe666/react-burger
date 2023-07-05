import { FC, ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { checkAuth } from "../../services/actions/user";
import { TProtectedRoute } from "../../services/utile/types";
import { useAppSelector } from "../../services/utile/typesRedux";

export const ProtectedRoute: FC<TProtectedRoute> = ({ children, authOnly }) => {
	const dispatch = useDispatch();
	const location = useLocation();
	const isAuthChecked = useAppSelector(
		(state) => state.registration.isAuthChecked
	);
	const isLogged = useAppSelector((state) => state.registration.isLogged);

	useEffect(() => {
		dispatch(checkAuth());
	}, [dispatch]);

	if (!isAuthChecked) {
		return <div>Loading...</div>;
	}

	if (!isLogged && authOnly) {
		return <Navigate to="/login" state={{ from: location }} />;
	}

	return children as any;
};
