(function() {
  'use strict';

  angular
    .module('desktop')
    .controller('NavbarController', NavbarController);

  /** @ngInject */
  function NavbarController($scope, $rootScope, $state, $location, LoopBackAuth) {

    var checkLogin = function() {

      $scope.loggedIn = localStorage.getItem("userID") != null; 

    };

    checkLogin();

    $rootScope.$on("refreshLogin", function() {

      checkLogin();

    });

  	$scope.logout = function() {

      LoopBackAuth.clearUser();
      LoopBackAuth.clearStorage();
      localStorage.clear();

    $scope.loggedIn = false;

      $state.go("app.account.login", {}, {refresh: true});

  	};

  }
})();
