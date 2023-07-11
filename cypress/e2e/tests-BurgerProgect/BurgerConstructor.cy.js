import { getIdOrderFromServer } from "../../../src/services/api";
const testUrl = "http://localhost:3000/";
const modalWindowElement = "[class^=ingredient_li]";
const closeWindow = '[class^="modal_cross"]';
const tab = ".tab";
const tabActiveClass = "tab_type_current";
const constructorContainer = "[class^=burger-constructor_section]";
const ingredientContainer = "[class^=burgerIngredients_scrollbar]";
const button = "button";
const textField = ".input";

describe("main page test", () => {
	beforeEach("open app", () => {
		cy.visit(testUrl);
	});

	it("modal window ingredient test ", () => {
		cy.get(modalWindowElement).eq(1).click();
		cy.get(closeWindow).should("exist");
		cy.get(closeWindow).click();
		cy.get(closeWindow).should("not.exist");
		cy.get(modalWindowElement).eq(6).click();
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
		cy.get(tab).eq(1).click().should("have.class", tabActiveClass);
		cy.get(tab).eq(2).click().should("have.class", tabActiveClass);
		cy.get(tab).eq(0).click().should("have.class", tabActiveClass);
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
		cy.get(textField).eq(0).type("vigoweg521@carpetra.com");
		cy.get(textField).eq(1).type("cc");
		cy.get(button).contains("Войти").click();
		cy.get(button).contains("Оформить заказ");
	});
});
