import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function RegistrationAuth({ children }) {
	const registrationData = useSelector((state) => state.registration.items);
	console.log(666, registrationData);

	const navigate = useNavigate();
	if (registrationData.success) {
		navigate("/");
	}
	return children;
}
