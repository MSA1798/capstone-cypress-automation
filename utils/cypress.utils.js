export const visitHomePageUrl = (url = 'https://amazon.in') => {
  return cy.visit(url);
}

export const searchAndOpenProductDetails = () => {
  cy.get('#twotabsearchtextbox').type('smartphones');
  cy.get('#nav-search-submit-button').click();
  cy.intercept('POST', 'https://fls-eu.amazon.in/1/batch/1/OE/', (req) => {
    req.reply({
      statusCode: 200,
      body: {
        productId: '123',
        productUrl: 'https://www.amazon.in/Apple-iPhone-13-128GB-Midnight/dp/B09G9HD6PD/ref=sr_1_1_sspa?crid=7XVZHBMYYLVD&dib=eyJ2IjoiMSJ9.YS4iBR86DTuZz_tuZiFRU_8guzu68Kq08vUwIsUBYj69UhlkTzkVpnSnnyyBzoOR8P2QMv-d4gjSBKg_hAvSfPlkdJfeVVOK9q1pbOwgJRwqePzxCAWH2i2cRPR982rhITodHbPIitTXEfiZdKrhQ1jDtcON7CxjMLSxmMdTYqEyyPemhIkE1wx52kvLWuLcsU5dKzTV9erEOB4wubniECnJpEQe6vz_zb1gF5BEOos.EDl6sp4fCQZgi4NLejW6ok0NtrsQB4XiDLJVymGmj7A&dib_tag=se&keywords=smartphones&qid=1726043061&sprefix=smartphones%2Caps%2C348&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1'
      },
      headers: { 'x-custom-header': 'value' },
    });
  }).as('getProductDetails');
  cy.get('#search').find('[data-component-type="s-search-result"]').get('.s-image').first().click({ 'force': true });
  
}