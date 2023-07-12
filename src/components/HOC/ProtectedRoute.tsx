import { FC, ReactNode, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { checkAuth } from "../../services/actions/user";
import {
	useAppDispatch,
	useAppSelector,
} from "../../services/types/typesRedux";

type TProtectedRoute = {
	authOnly?: boolean;
	children: ReactNode;
};

export const ProtectedRoute: FC<TProtectedRoute> = ({ children, authOnly }) => {
	const dispatch = useAppDispatch();
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

	return <> {children} </>;
};
