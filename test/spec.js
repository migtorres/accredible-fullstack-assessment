// spec.js
describe('credentials', function() {


  beforeEach(function() {
    browser.get('http://localhost:3000/');
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Credential List');
  });

  
  //var text = $('.search-bar');
	//var valid = element(by.binding('credentialUrl.input.$valid'));
	//var input = element(by.model('credential.magento'));
	
	//it('should be invalid if empty', function() {
	//  input.clear();
	//  input.sendKeys('');
	//
	//  expect(text.getText()).toEqual('');
	//  expect(valid.getText()).toContain('false');
	//});
	//
	//it('should be invalid if not url', function() {
	//  input.clear();
	//  input.sendKeys('box');
	//
	//  expect(valid.getText()).toContain('false');
	//});

  it('should add a card after giving valid url', function() {


    var searchBar = $('.search-bar');

    searchBar.sendKeys('https://u.magento.com/certification/directory/dev/214');

    var cards = $('.cards ng-scope');

		element(by.css('ng-binding')).getText().then(function(text){expect(text).toContain("Developer")});
		element(by.binding('credential.courseName')).getText().then(function(text){expect(text).toContain("yf9dus5130")});
		element(by.binding('credential.issuedOn')).getText().then(function(text){expect(text).toContain("07/11/2014")});
  });
});
