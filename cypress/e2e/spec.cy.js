describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
  })
})

describe('API Tests', () => {
  it('Fetches and displays Wikipedia page contents', () => {
    cy.intercept('GET', 'https://en.wikipedia.org/w/api.php?').as('fetchContents');
    cy.visit('/'); 
    cy.wait('@fetchContents').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.contains('Loading...').should('not.exist');
    cy.contains('An error occurred').should('not.exist'); 
  });

  it('Handles error when API fails', () => {
    cy.intercept('GET', 'https://en.wikipedia.org/w/api.php?', {
      statusCode: 500,
      body: 'Server Error',
      delayMs: 200,
    }).as('fetchError');
    cy.visit('/'); 
    cy.wait('@fetchError').then(({ response }) => {
      expect(response.statusCode).to.equal(500);
    cy.contains('An error occurred').should('exist');
    });
  });
});

describe('App Component', () => {
  it('Loads the app properly', () => {
    cy.visit('/'); 
    cy.get('.header-text').should('be.visible');
    cy.get('.login-button').should('be.visible');
  });

  it('Displays footer controversies', () => {
    cy.visit('/');
    cy.get('.footer-card').should('be.visible');
    cy.get('.footer-text').should('contain', 'Random Controversy');
  });
});

describe('Can search for a Controversy', () => {
  it('Searches for a term', () => {
    cy.visit('/');
    cy.get('input[type="text"]').type('SearchTerm{enter}');
  });

  it('Displays controversies for a search result', () => {
    cy.visit('/');
  });
});

describe('Card Component', () => {
  it('Renders snippet properly', () => {
    cy.visit('/');
    cy.get('.card-content').should('be.visible');
  });

  it('Handles show more/show less functionality', () => {
    cy.visit('/');
  });
});

describe('WikipediaPage Component', () => {
  it('Loads page content properly', () => {
    cy.visit('/article/PageTitle'); 
    cy.get('.article').should('be.visible');
  });

  it('Saves controversy properly', () => {
    cy.visit('/'); 
  });
});