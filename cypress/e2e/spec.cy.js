describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
  })
})

//Need to login before testing
describe('API Tests', () => {
  it('Fetches and displays Wikipedia page contents', () => {
    cy.intercept('GET', 'https://en.wikipedia.org/w/api.php?', {
      statusCode: 200,
      fixture: 'wikipediaApiResponse.json'

    }).as('fetchContents');
    cy.visit('http://localhost:3000/');
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
    cy.visit('http://localhost:3000/'); 
    cy.wait('@fetchError').then(({ response }) => {
      expect(response.statusCode).to.equal(500);
    cy.contains('An error occurred').should('exist');
    });
  });
});

describe('App Component', () => {
  it('Loads the app properly', () => {
    cy.visit('http://localhost:3000/'); 
    cy.get('.header-text').should('be.visible');
    cy.get('.login-button').should('be.visible');
  });

  it('Displays footer controversies', () => {
    cy.visit('http://localhost:3000/');
    cy.get('.footer-card').should('be.visible');
    cy.get('.footer-text').should('contain', 'Random Controversy');
  });
});

describe('Can search for a Controversy', () => {
  it('Searches for a term', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input[type="text"]').type('SearchTerm{enter}');
  });

  it('Displays controversies for a search result', () => {
    cy.visit('http://localhost:3000/');
  });
});

describe('Card Component', () => {
  it('Renders snippet properly', () => {
    cy.visit('http://localhost:3000/');
    cy.get('.card-content').should('be.visible');
  });

  it('Handles show more/show less functionality', () => {
    cy.visit('http://localhost:3000/');
  });
});

describe('WikipediaPage Component', () => {
  it('Loads page content properly', () => {
    cy.visit('http://localhost:3000/Profile'); 
    cy.get('.article').should('be.visible');
  });

  it('Saves controversy properly', () => {
    cy.visit('http://localhost:3000/'); 
  });
});