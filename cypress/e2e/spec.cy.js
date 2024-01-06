//Need to login before testing
describe('API Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  })
  it('Fetches and displays Wikipedia page contents', () => {
    cy.intercept('GET', 'https://en.wikipedia.org/w/api.php?', {
      statusCode: 200,
      fixture: 'wikipediaApiResponse',
    }).as('fetchContents');
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
    cy.wait('@fetchError').then(({ response }) => {
      expect(response.statusCode).to.equal(500);
    cy.contains('An error occurred').should('exist');
    });
  });
});

describe('App Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  })

  it('Loads the app properly', () => {
    cy.get('.header-text').should('be.visible');
    cy.get('.login-button').should('be.visible');
    cy.get('.random-headline').should('be.visible');
  });

  it('Displays random controversies', () => {
    cy.get('.card').should('be.visible');
    cy.get('.result-name').should('contain', '');
    cy.get('.random-headline').should('contain', 'Random Controversy');
    cy.get('.');
  });
});

describe('Can search for a Controversy', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  })

  it('Searches for a term', () => {
    cy.get('input[type="text"]').type('SearchTerm{enter}');
  });

  it('Displays controversies for a search result', () => {

  });
});

describe('Card Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  })

  it('Renders snippet properly', () => {

    cy.get('.card-content').should('be.visible');
  });

  it('Handles show more/show less functionality', () => {

  });
});

describe('WikipediaPage Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  })

  it('Loads page content properly', () => {
    cy.visit('http://localhost:3000/Profile'); 
    cy.get('.article').should('be.visible');
  });

  it('Saves controversy properly', () => {
 
  });
});