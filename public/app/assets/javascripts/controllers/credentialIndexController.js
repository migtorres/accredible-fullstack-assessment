/*global angular*/
/*global Tautologistics */

angular.module('Credentials').controller('CredentialsIndexController', function($scope, $http){
  $scope.credentials = [];
  $scope.isSubmitting = false;

  $scope.createCredential = function(url){
    $scope.error = false
    $scope.isSubmitting = true;
    $scope.magentoUrl = url.magento;
  	lookUpUrl();
  };

  function lookUpUrl(){
  	var localUrl = 'http://localhost:3000/get-url?url=';
  	$http.get( localUrl + $scope.magentoUrl).then(successCallback, errorCallback);
    $scope.httpReady = false
  }

	function successCallback(response){
    $scope.httpReady = true
    var magentoHtml = response.data.html;
  	var handler = new Tautologistics.NodeHtmlParser.DefaultHandler(function (error, magentoHtml) {
  		if (error)
      	$scope.error = true;
  		else
      	return magentoHtml;
			});
  	var parser = new Tautologistics.NodeHtmlParser.Parser(handler);
		parser.parseComplete(magentoHtml);

		var domBaseLocation = handler.dom[2].children[1].children[19].children[3].children[1].children[7].children[5];
		var courseName = domLastPath(domBaseLocation.children[1]).trim()
		$scope.magentoData = { 'courseName': courseName,
						'courseId': domLastPath(domBaseLocation.children[3]).trim(),
						'issuedOn': domLastPath(domBaseLocation.children[5]).trim(),
					  'status':'Verified',
						'image': courseName + '.png',
						'url': $scope.magentoUrl};
		appendCredential();
	}

	function errorCallback(){
  	//error code
    $scope.httpReady = true
   	$scope.error = true;
    $scope.isSubmitting = false;
	}

	function appendCredential(){
		$scope.credentials.push($scope.magentoData);
    $scope.isSubmitting = false;
	}

	function domLastPath(selectedPath){
		return selectedPath.children[3].children["0"].data;
	}
});
