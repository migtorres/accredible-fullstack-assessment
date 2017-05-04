/*global angular*/
/*global Tautologistics */

angular.module('Credentials').controller('CredentialsIndexController', function($scope, $http){
  $scope.credentials = [];
  $scope.isSubmitting = false;

  $scope.createCredential = function(url){
    $scope.isSubmitting = true;
  	magentoData(url.magento);
    $scope.magentoData.url = url.magento;
  	$scope.credentials.push($scope.magentoData);
    $scope.isSubmitting = false;
  };

  function magentoData(magentoUrl){
  	var lookupUrl = 'http://localhost:3000/get-url?url=';
  	$http.get( lookupUrl + magentoUrl).then(successCallback, errorCallback);
  }

	function successCallback(response){
    var magentoHtml = response.data.html;
  	var handler = new Tautologistics.NodeHtmlParser.DefaultHandler(function (error, magentoHtml) {
  		if (error)
      	$scope.error = error;
  		else
      	return magentoHtml;
			});
  	var parser = new Tautologistics.NodeHtmlParser.Parser(handler);
		parser.parseComplete(magentoHtml);

		var domBaseLocation = handler.dom[2].children[1].children[19].children[3].children[1].children[7].children[5];
		$scope.magentoData = { 'courseName': domLastPath(domBaseLocation.children[1]),
						'courseId': domLastPath(domBaseLocation.children[3]),
						'issuedOn': domLastPath(domBaseLocation.children[5]),
					  'status':'Verified'};
	}

	function errorCallback(error){
  	//error code
   	$scope.error = error;
	}

	function domLastPath(selectedPath){
		return selectedPath.children[3].children["0"].data;
	}
});
