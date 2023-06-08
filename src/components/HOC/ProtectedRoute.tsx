import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

type TProtectedRoute = {
	authOnly?: false | true;
	children: ReactNode;
};

export const ProtectedRoute: FC<TProtectedRoute> = ({ children, authOnly }) => {
	const location = useLocation();
	const isAuthChecked = useSelector(
		(state: any) => state.registration.isAuthChecked
	);
	const isLogged = useSelector((state: any) => state.registration.isLogged);

	// const { from } = location.state || { from: { pathname: "/" } };
	// console.log(location.pathname, authOnly, isLogged, from);

	if (!isAuthChecked) {
		return <div>Loading...</div>;
	}

	if (!isLogged && authOnly) {
		return <Navigate to="/login" state={{ from: location }} />;
	}

	return children as any;
};
