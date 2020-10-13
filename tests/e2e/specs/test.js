// https://docs.cypress.io/api/introduction/api.html

describe("Login Form Test", () => {
  it("Login button", () => {
    cy.visit("/login");
    cy.contains("button", "Login");
  });
});

describe("H1 test", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.window().then(win => {
      console.log(win);
      //todo here we assign container dependency for mocking
      win.$container.set("dep", "1");
    });
  });

  it("text", () => {
    cy.get("button").click();
    cy.contains("h1", "1");
  });
});
