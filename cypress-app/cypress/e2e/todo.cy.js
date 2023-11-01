/// <reference types="Cypress" />

describe("Todo list", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the heading", () => {
    cy.get('[data-test-id="heading"]').should("contain", "Todo App");
    cy.get('[data-test-id="no-todo"]').should("contain", "No todos");
  });

  it("should add a new todo to the list", () => {
    cy.get('[data-test-id="heading"]').should("contain", "Todo App");
    cy.get('[data-test-id="add-todo-input"]').type("Write a medium article");
    cy.get("button").contains("Add").click();
    cy.get('[data-test-id="todo-title"]').should(
      "contain",
      "Write a medium article"
    );
  });

  it("should able to complete todo", () => {
    cy.get('[data-test-id="heading"]').should("contain", "Todo App");
    cy.get('[data-test-id="add-todo-input"]').type("Write a medium article");
    cy.get("button").contains("Add").click();
    cy.get('[data-test-id="todo-item"]')
      .should("contain", "Write a medium article")
      .find('[data-test-id="todo-checkbox"]')
      .click();
    cy.get('[data-test-id="todo-item"]')
      .should("contain", "Write a medium article")
      .find('[data-test-id="todo-checkbox"]')
      .should("be.checked");
  });

  it("should delete a todo from the list", () => {
    cy.get('[data-test-id="add-todo-input"]').type("Write a medium article");
    cy.get("button").contains("Add").click();
    cy.get('[data-test-id="todo-item"]')
      .get("p")
      .should("contain", "Write a medium article");
    cy.get('[data-test-id="todo-delete"]').click();
    cy.get("main").should("not.have.text", "Write a medium article");
  });
});
