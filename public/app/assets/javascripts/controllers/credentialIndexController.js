/*global angular*/
/*global Tautologistics */
/*global jQuery */

angular.module('Credentials').controller('CredentialsIndexController', function($scope, $http) {
  $scope.credentials = [];
  $scope.isSubmitting = false;

  // Reads the form and queries magento url
  $scope.createCredential = function(url) {
    $scope.error = false;
    $scope.isSubmitting = true;
    $scope.magentoUrl = url.magento;
    lookUpUrl();
  };

  //reads from URL
  function lookUpUrl() {
    var localUrl = 'http://localhost:3000/get-url?url=';
    $http.get(localUrl + $scope.magentoUrl).then(successCallback, errorCallback);
    $scope.httpReady = false;
  }

  // Does all the stuff when has success
  function successCallback(response) {
    $scope.httpReady = true;
    var magentoHtml = response.data.html;
    var parsedHtml = parseHtml(magentoHtml);
    magentoData(parsedHtml);
    appendCredential();
  }

  //The following functions are to parse HTML from Magento

  // Uses HTML parser to get object with the dom
  function parseHtml(magentoHtml) {
    var handler = new Tautologistics.NodeHtmlParser.DefaultHandler(function(error) {
      if (error) $scope.error = true;
    });
    var parser = new Tautologistics.NodeHtmlParser.Parser(handler);
    parser.parseComplete(magentoHtml);
    return handler;
  }

  // extracts wanted fields from DOM and sets them to $scope.magentoData
  function magentoData(parsedHtml) {
    var baseLocation = domBaseLocation(parsedHtml);
    domFields(baseLocation);
    jQuery.extend($scope.magentoData, {
      status: 'Verified',
      image: $scope.magentoData.courseName + '.png',
      url: $scope.magentoUrl
    });
  }

  // Finds table where information needed sits
  function domBaseLocation(parsedHtml) {
    try {
      return parsedHtml.dom[2].children[1].children[19].
      children[3].children[1].children[7].children[5];
    } catch (err) {
      errorCallback();
    }
  }

  // For each field the way to get it is similar and this function gets it
  function domLastPath(selectedPath) {
    return selectedPath.children[3].children["0"].data;
  }

  // Adds directly extracted fields to magentoData $scope object
  function domFields(domBaseLocation) {
    $scope.magentoData = {
      courseName: domLastPath(domBaseLocation.children[1]).trim(),
      courseId: domLastPath(domBaseLocation.children[3]).trim(),
      issuedOn: domLastPath(domBaseLocation.children[5]).trim()
    };
  }

  // End of HTML parsing functions

  // Handles errors so they are shown next to the search bar
  function errorCallback() {
    $scope.httpReady = true;
    $scope.error = true;
    $scope.isSubmitting = false;
  }

  // Appends credential to existing array
  function appendCredential() {
    $scope.credentials.push($scope.magentoData);
    $scope.isSubmitting = false;
  }
});