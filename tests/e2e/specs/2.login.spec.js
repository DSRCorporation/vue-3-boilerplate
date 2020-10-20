describe("Login Form", () => {
  before(() => {
    /*
     *  Todo we need to seed data here
     *  Usually its done by sending some API calls to the server (cy.request)
     *  or by performing some server command (e.g. cy.exec('npm run db:reset && npm run db:seed'))
     */
  });

  beforeEach(() => {
    cy.visit("/login");
    cy.clearLocalStorage();
  });

  it("contains login button", () => {
    cy.contains("button", "Log In");
  });

  it("logins user in", () => {
    cy.get('[name="username"]').type("dmitry");
    cy.get('[name="password"]').type("dmitry");
    cy.get("button").click();
    cy.location("pathname").should("be", "/");
    // probably not the best way to wait until a page navigation, looks like there is no a good way in cypress for now
    cy.wait(100);
    cy.getLocalStorage("token").should("exist");
  });

  after(() => {
    // Todo remove seed data here
  });
});
