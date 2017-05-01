angular.module('Credentials').controller('CredentialsIndexController', function($scope){
	var credentialList = [
								{"id":10023910 ,"courseName": "Existing Credential Course Name",
								 "IssuedOn": "Mar 20 2017", "verified": true,
								 "url": "http://www.credential.net/1000001"}
							  ]
  $scope.credentials = credentialList;
});
