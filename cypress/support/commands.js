// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import { attachCustomCommands } from "cypress-firebase";

const fbConfig = {
  apiKey: Cypress.config("apiKey"),
  authDomain: Cypress.config("authDomain"),
  databaseURL: Cypress.config("databaseURL"),
  projectId: Cypress.config("projectId"),
  storageBucket: Cypress.config("storageBucket"),
  messagingSenderId: Cypress.config("messagingSenderId"),
  appId: Cypress.config("appId"),
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });

Cypress.Commands.add(
  "fillSignUp",
  (
    Email = "test@test.com",
    Contraseña = "test",
    Contraseña2 = "test",
    Nombre = "Nombre",
    Apellido = "Apellido",
    DNI = "DNI",
    workplace = "Palma de Mallorca"
  ) => {
    cy.get("#Email").type(Email);
    cy.get("#Contraseña").type(Contraseña);
    cy.get("#Contraseña2").type(Contraseña2);
    cy.get("#Nombre").type(Nombre);
    cy.get("#Apellido").type(Apellido);
    cy.get("#DNI").type(DNI);
    cy.get("#grid-state").select(workplace);
    cy.get(".form-checkbox").check();
    cy.get("button[type='submit']").click();
  }
);
