describe("The Register Page", () => {
  beforeEach(() => {
    cy.visit("/sign-in");
    // Accept cookies
    cy.get(".cc_b_ok").click();
  });

  it("check UI btn", () => {
    cy.get("form").should("exist");
    cy.contains("Email");
    cy.get("#Email")
      .should("exist")
      .should("have.attr", "required");
    cy.contains("Contraseña");
    cy.get("#Contraseña")
      .should("exist")
      .should("have.attr", "required");
    cy.contains("Repetir contraseña");
    cy.get("#Repetir contraseña")
      .should("exist")
      .should("have.attr", "required");
    cy.contains("Nombre");
    cy.get("#Nombre")
      .should("exist")
      .should("have.attr", "required");
    cy.contains("DNI/NIE");
    cy.get("#DNI/NIE")
      .should("exist")
      .should("have.attr", "required");
    cy.contains(" Centro de Trabajo ");
    cy.get("#grid-state")
      .should("exist")
      .should("have.length", 6)
      .should("have.attr", "required");
    cy.get("button[type='submit']").should("exist");
    cy.contains("Email address");
    cy.contains(" Password ");
  });
  it("check UI btn", () => {
    cy.get("#signIn").should("exist");
    cy.get("#email")
      .should("exist")
      .should("have.attr", "required");
    cy.get("#password")
      .should("exist")
      .should("have.attr", "required");
    cy.get("button[type='submit']").should("exist");
    cy.contains("Email address");
    cy.contains(" Password ");
  });
  it("requieres valid password and username", () => {
    cy.get("#email").type("test@fail.com");
    cy.get("#password").type("willfail{enter}");
    cy.get("#alertMsg")
      .should("exist")
      .should("contain", " El usuario no coincide con ninguna credencial");
  });

  it("navigate to /dashboard on success login", () => {
    cy.get("#email").type("test@test.com");
    cy.get("#password").type("123456{enter}");
    //cy.hash().should('eq', '/dashboard')
  });

  it("LogOut", () => {
    cy.logout();
  });

  it("Go to SignIn", () => {
    cy.contains(" Regístrate ").click();
  });
});
