describe('Central de Atendimento ao Cliente TAT', () => {
  const THREE_SECONDS_IN_MS = 3000;
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.clock()

    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('js@gmail.com')
    cy.get('#open-text-area').type('Você está fazendo um ótimo trabalho', {delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.success').should('not.be.visible')

  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock()

    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('js@gmailcom')
    cy.get('#open-text-area').type('Você está fazendo um ótimo trabalho', {delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.error').should('not.be.visible')
  })

  Cypress._.times(3, () => {
    it('campo telefone continua vazio quando preenchido com valor não-numérico', () => {
      cy.get('#phone')
        .type('phonenãoaceitaletra')
        .should('have.value', '')
    })
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()

    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('js@gmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Você está fazendo um ótimo trabalho', {delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.error').should('not.be.visible')
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
    cy.clock()

    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.error').should('not.be.visible')
  })

  it('envia o formulário com sucesso usando um comando customizado', () => {
    cy.clock()

    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.success').should('not.be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('[type="radio"]')
      .check('feedback')
      .should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('[type="radio"]')
      .should('have.length', 3)
      .each(($radio) => {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('[type="checkbox"]')
      .check()
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json')
      .should(($input) => {
        expect($input[0].files[0].name).to.eq('example.json');
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(($input) => {
        expect($input[0].files[0].name).to.eq('example.json');
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(($input) => {
        expect($input[0].files[0].name).to.eq('example.json');
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
    cy.contains('Talking About Testing').should('be.visible')
  })
  
  it.only('faz uma requisição HTTP', () => {
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
      .should((response) => {
        const {status, statusText, body} = response
        expect(status).to.equal(200)
        expect(statusText).to.equal('OK')
        expect(body).to.include('CAC TAT')
      })
  })
})