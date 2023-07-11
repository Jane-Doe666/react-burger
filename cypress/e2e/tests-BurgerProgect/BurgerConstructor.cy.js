const modalWindowElement = "[class^=burgerIngredients_section]";
const closeWindow = '[class^="modal_cross"]';
const constructorContainer = "[class^=burger-constructor_section]";
const ingredientContainer = "[class^=burgerIngredients_scrollbar]";
const button = "button";
const tab = ".tab";

describe("main page test", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/");
	});

	it("modal window ingredient test ", () => {
		cy.get(modalWindowElement).click();
		cy.get(closeWindow).should("exist");
		cy.get(closeWindow).children().click();
		cy.get(closeWindow).should("not.exist");
		cy.get(modalWindowElement).click();
		cy.get("body").type("{esc}");
		cy.get(closeWindow).should("not.exist");
	});

	it("header test", () => {
		cy.get("a").contains("Лента заказов").click();
		cy.location("pathname").should("eq", "/feed");
		cy.go("back");

		cy.get("a").contains("Конструктор").click();
		cy.location("pathname").should("eq", "/");

		cy.get("a").contains("Личный кабинет").click();
		cy.location("pathname").should("eq", "/login");
	});

	it("active tab test", () => {
		cy.get(`.burgerIngredients_nav> :nth-child(3)`).click();
		cy.get(`.burgerIngredients_nav> :nth-child(1)`).click();
	});

	it("test drag ang drop", function () {
		cy.get(ingredientContainer).contains("Соус Spicy-X").trigger("dragstart");
		cy.get(constructorContainer).trigger("drop");

		cy.get(ingredientContainer)
			.contains("Краторная булка N-200i")
			.trigger("dragstart");
		cy.get(constructorContainer).trigger("drop");

		cy.get(ingredientContainer)
			.contains("Мини-салат Экзо-Плантаго")
			.trigger("dragstart");
		cy.get(constructorContainer).trigger("drop");

		cy.get(button).contains("Оформить заказ").click();
		cy.location("pathname").should("eq", "/login");
	});
});
