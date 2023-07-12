import { CLOSE_MODAL } from "../actions/app";
import { OPEN_INGREDIENT } from "../actions/ingredientDetails";
import { bunTest } from "../utile/codeTest.jsx";
import { ingredientDetailsReducer, initialState } from "./ingredientDetails";

describe("ingredientDetailsReducer reducer", () => {
	it("initial state control", () => {
		expect(ingredientDetailsReducer(undefined, {})).toEqual(initialState);
	});

	it("run OPEN_INGREDIENT", () => {
		expect(
			ingredientDetailsReducer(initialState, {
				type: OPEN_INGREDIENT,
				info: bunTest,
				setModal: true,
			})
		).toEqual({
			...initialState,
			info: bunTest,
			setModal: true,
		});
	});

	it("run CLOSE_MODAL", () => {
		expect(
			ingredientDetailsReducer(initialState, {
				type: CLOSE_MODAL,
				setModal: false,
			})
		).toEqual({
			...initialState,
			setModal: false,
		});
	});
});
