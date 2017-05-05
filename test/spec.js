// spec.js
describe('credentials', function() {


  beforeEach(function() {
    browser.get('http://localhost:3000/');
  });

  var searchBar = $('.form-control');
  var button = element(by.id('validate-button'))

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Credential List');
  });

  it('should add a card after giving valid url', function() {
    searchBar.sendKeys('https://u.magento.com/certification/directory/dev/214');

    button.click()

    element(by.id('course-name')).getText().then(function(text){expect(text).toContain("Developer")});
    element(by.id('course-id')).getText().then(function(text){expect(text).toContain("yf9dus5130")});
    element(by.id('issued-on')).getText().then(function(text){expect(text).toContain("07/11/2014")});
  });

  it('should show message for invalid url', function() {

    searchBar.sendKeys('dfsf');

    element(by.css('.help-block')).getText().then(function(text){expect(text)
      .toContain("Enter a valid URL.")});
  });

  it('should show message for invalid magento url', function() {
    searchBar.sendKeys('https://u.magento.com/certification/directory/dev/sdfsd');

    button.click()

    element(by.id('bad-response')).getText().then(function(text){expect(text)
      .toContain("Could not get")});
  });
});
