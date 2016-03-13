(function() {
  'use strict';

  angular
    .module('desktop')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($scope, $rootScope, $location, ApplicationUser) {

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {

        var data = $scope.loginData;

        ApplicationUser.login(data, function(res) {

            $rootScope.loggedInUser = data.email;
            $rootScope.userId = res.userId;


            var userID = res.userId;
            localStorage.setItem('userID', userID);

            $location.path("/account/profile");
        }, function(res) {

            $scope.errorMessage = "Your login was unsuccessful. Please check your account details and try again."
            
        });

    };

  }
})();
