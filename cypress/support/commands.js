Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  cy.get('#firstName').type('João')
  cy.get('#lastName').type('Silva')
  cy.get('#email').type('js@gmail.com')
  cy.get('#open-text-area').type('Você está fazendo um ótimo trabalho')
  cy.contains('button', 'Enviar').click()
})