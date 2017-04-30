angular.module('Credentials').config(function($routeProvider){
  $routeProvider
    .when('/', {
      redirectTo: '/credentials'
    })

    .when('/credentials', {
      templateUrl: "app/assets/templates/index.html",
      controller: "CredentialsIndexController"
    })
});
