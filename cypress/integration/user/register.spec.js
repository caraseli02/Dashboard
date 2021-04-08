describe("The Login Page", () => {
  beforeEach(() => {
    cy.visit("/sign-up");
    // Accept cookies
    cy.get(".cc_b_ok").click();
  });

  /* 
  it("check UI btn", () => {
    //cy.get("form").should("exist");
    cy.contains("Email");
    cy.get("#Email")
      .should("exist")
      .should("have.attr", "required");
    cy.contains("Contraseña");
    cy.get("#Contraseña")
      .should("exist")
      .should("have.attr", "required");
    cy.contains("Repetir contraseña");
    cy.get("#Contraseña2")
      .should("exist")
      .should("have.attr", "required");
    cy.contains("Nombre");
    cy.get("#Nombre")
      .should("exist")
      .should("have.attr", "required");
    cy.contains("DNI NIE");
    cy.get("#DNI")
      .should("exist")
      .should("have.attr", "required");
    cy.contains(" Centro de Trabajo ");
    cy.get("#grid-state")
      .children()
    cy.get("#grid-state")
      .should("exist")
      .should("have.attr", "required");
    cy.get(".form-checkbox").check()
    cy.get("button[type='submit']").should("exist");
    cy.contains(" Crear cuenta ").click()

  });
*/
  // it("requieres igual passwords", () => {
  //   cy.fillSignUp(Email = "test@test.com", Contraseña2 = "test2")
  //   cy.get("button[type='submit']").click();
  //   cy.get("#alertMsg")
  //     .should("exist")
  //     .should("contain", " Las contraseñas no son iguales");
  // });
  
  // it("user exist popup", () => {
  //   cy.fillSignUp()
  //   cy.get("button[type='submit']").click();
  //   cy.get("#alertMsg")
  //     .should("exist")
  // });

  it("go to dashboard after sign-in", () => {
    cy.fillSignUp()
    cy.get("button[type='submit']").click();
  });

  // it("navigate to /dashboard on success login", () => {
  //   cy.get("#email").type("test@test.com");
  //   cy.get("#password").type("123456{enter}");
  //   //cy.hash().should('eq', '/dashboard')
  // });

  // it("LogOut", () => {
  //   cy.logout();
  // });

  // it("Go to SignUp", () => {
  //   cy.contains(" Regístrate ").click();
  // });
});
