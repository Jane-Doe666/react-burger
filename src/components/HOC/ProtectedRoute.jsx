import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import {
	DISPATCH_FUNCTION,
	getUserInfo,
} from "../../services/actions/getUserInfo";
import { getCookie } from "../../services/utile/utile";

export function ProtectedRoute({ children }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isCookie = getCookie("accessToken");
	let isAuth = useSelector((state) => state.registration.isAuth);
	let isDispatch = useSelector((state) => state.registration.isDispatch);

	const handleAuthorization = () => {
		dispatch({ type: DISPATCH_FUNCTION, payload: true });
		dispatch(getUserInfo());
	};

	useEffect(() => {
		isCookie === undefined ? navigate("/login") : handleAuthorization();
	}, []);

	return isDispatch && !isAuth ? <div>Loading....</div> : children;
}
