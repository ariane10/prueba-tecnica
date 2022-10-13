describe('github-issues', () => {
  beforeEach(() => cy.visit('http://localhost:4200'));

  it('should display repository issues', () => {
    cy.get('input[name=url]').type('https://github.com/ariane10/docker-exercises')
    cy.contains('Search').click()
    cy.contains('Repository');
  })


  it('incorrect repository url - should return an error', () => {
    cy.get('input[name=url]').type('https://github.com/user/repository')
    cy.contains('Search').click()
    cy.contains('The provided url is not valid');
  })

});
