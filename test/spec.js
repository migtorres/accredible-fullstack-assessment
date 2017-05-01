// spec.js
describe('credentials', function() {

  beforeEach(function() {
    browser.get('http://localhost:3000/');
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Credential List');
  });

  it('should have a preset card', function() {
    browser.get('http://localhost:3000/');

    var card = $('.card');

    expect(card.isDisplayed()).toBe(true)
  });
});
