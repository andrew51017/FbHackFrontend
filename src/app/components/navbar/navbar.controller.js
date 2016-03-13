(function() {
  'use strict';

  angular
    .module('desktop')
    .controller('NavbarController', NavbarController);

  /** @ngInject */
  function NavbarController($scope, $location, LoopBackAuth) {

	$scope.loggedIn = localStorage.getItem("userID") != null; 

  	$scope.logout = function() {

      LoopBackAuth.clearUser();
      LoopBackAuth.clearStorage();
      localStorage.clear();

      $location.path("/app/account/login");

  	};

  }
})();
