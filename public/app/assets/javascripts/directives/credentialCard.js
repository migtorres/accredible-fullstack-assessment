angular.module('Credentials').directive("credentialCard", function(){
  return {
    restrict: "E",
    templateUrl: 'app/assets/templates/directives/credential-card.html',
    scope:{
    	status: "=",
    	image: "=",
    	url: "=",
    	courseName: "=",
    	courseId: "=",
    	issuedOn: "="
    }
  };
});