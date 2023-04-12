describe('Navigation', () => {
  it('should navigate to user page', () => {
    cy.visit('http://127.0.0.1:3000/')

    cy.get('a[href*="/user-page"]').click()

    cy.url().should('include', '/user-page')

    cy.get('h1').contains('User page')
  })

  it('should navigate to search page from user page', () => {
    cy.visit('http://127.0.0.1:3000/user-page')

    cy.get('nav > a:first').click()

    cy.url().should('include', '/')

    cy.get('h2').contains('No movie found')
  })
})

describe('Search', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:3000/')

    cy.get('input#movie-search').as('searchInput')

    cy.get('button#search-button').as('searchButton')
  })

  it('should search for Shrek movie', () => {
    cy.visit('http://127.0.0.1:3000/')

    cy.get('@searchInput').type('Shrek')

    cy.get('@searchButton').click()

    cy.get('h2').contains('Shrek')
  })

  it('should search for The Matrix movie from User page', () => {
    cy.visit('http://127.0.0.1:3000/user-page')

    cy.get('@searchInput').type('The Matrix')

    cy.get('@searchButton').click()

    cy.get('h2').contains('The Matrix')
  })

  it('should search for Great Gatsby with typo and fail', () => {
    cy.visit('http://127.0.0.1:3000/')

    cy.get('@searchInput').type('Great Gatsbo')

    cy.get('@searchButton').click()

    cy.get('h2').contains('No movie found')
  })
})

describe('User Interactions', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:3000/')

    cy.get('input#movie-search').as('searchInput')

    cy.get('button#search-button').as('searchButton')
  })

  it('should have no movies in watchlist or seen list', () => {
    cy.visit('http://127.0.0.1:3000/')

    cy.get('a[href*="/user-page"]').click()

    cy.get('h1').contains('User page')

    cy.get('button').contains('seen').click()

    cy.get('p').contains('Nothing here yet')

    cy.get('button').contains('watchlist').click()

    cy.get('p').contains('Nothing here yet')
  })

  it('should add Shrek movie to watchlist', () => {
    cy.visit('http://127.0.0.1:3000/')

    cy.get('@searchInput').type('Shrek')

    cy.get('@searchButton').click()

    cy.get('h2').contains('Shrek')

    cy.get('button').contains('Add to Watchlist').click()

    cy.get('button').contains('Remove from Watchlist')

    cy.get('a[href*="/user-page"]').click()

    cy.get('h1').contains('User page')

    cy.get('ul > li').contains('Shrek')
  })

  it('should add Shrek movie to seen list and remove from watchlist', () => {
    cy.visit('http://127.0.0.1:3000/')

    cy.get('@searchInput').type('Shrek')

    cy.get('@searchButton').click()

    cy.get('h2').contains('Shrek')

    cy.get('button').contains('Add to Watchlist').click()

    cy.get('button').contains('Remove from Watchlist')

    cy.get('a[href*="/user-page"]').click()

    cy.get('h1').contains('User page')

    cy.get('ul > li').contains('Shrek')

    cy.visit('http://127.0.0.1:3000/')

    cy.get('@searchInput').type('Shrek')

    cy.get('@searchButton').click()

    cy.get('h2').contains('Shrek')

    cy.get('button').contains('Remove from Watchlist')

    cy.get('button').contains('Seen').click()

    cy.get('button').contains('Not Seen')

    cy.get('button').contains('Add to Watchlist')
  })
})
