describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('js@gmail.com')
    cy.get('#phone').type('20463589')
    cy.get('#product').select('Cursos')
    cy.get('#support-type > :nth-child(3)').click()
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Você está fazendo um ótimo trabalho', {delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('js@gmailcom')
    cy.get('#open-text-area').type('Você está fazendo um ótimo trabalho', {delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('campo telefone continua vazio quando preenchido com valor não-numérico', () => {
    cy.get('#phone')
    .type('phonenãoaceitaletra')
    .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('js@gmail.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Você está fazendo um ótimo trabalho', {delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('João')
      .should('have.value', 'João')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Silva')
      .should('have.value', 'Silva')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('js@gmail.com')
      .should('have.value', 'js@gmail.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('20463589')
      .should('have.value', '20463589')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('envia o formulário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })
})