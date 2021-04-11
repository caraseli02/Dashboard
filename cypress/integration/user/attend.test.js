describe("The Register Page", () => {
  Cypress.config("baseUrl", "https://apimosa-staging.oa.r.appspot.com");

  // it("LogOut", () => {
  //   cy.logout();
  // });

  it("Login", () => {
    cy.login();
  });

  it("VUEX", () => {
    cy.visit('http://localhost:8080/dashboard')
    cy.window().should('have.property', '__store__')
    cy.window().then( win => {
      return win.__store__
    })
  });

  // it("Punch IN", () => {
  //   playload = {
  //     data: {
  //       email: "test@test.com",
  //       uid: "dZV7eoFcCGZz2uOXZlq3cvIpzLK2",
  //       gpsLoc: {
  //         lng: 2.6055485,
  //         lat: 39.5049907,
  //       },
  //       gpsData: {
  //         State: "Illes Balears",
  //         County: "Illes Balears",
  //       },
  //       dttm: new Date(),
  //       enterTime: "",
  //       temperature: "36.6",
  //     },
  //     author: "dZV7eoFcCGZz2uOXZlq3cvIpzLK2",
  //   };
  //   cy.request("POST", "/attend", playload).then(response => {
  //     // response.body is automatically serialized into JSON
  //     expect(response).to.have.property("status", 201); // true
  //   });
  // });

  // it("Delete Attend", () => {
  //   const opts = { recursive: true };
  //   cy.callFirestore("delete", "attendance", opts);
  // });
});
