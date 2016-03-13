(function() {
  'use strict';

  angular
    .module('desktop')
    .controller('RegisterController', RegisterController);

  /** @ngInject */
  function RegisterController($scope, $rootScope, $location, ApplicationUser) {

    $scope.doRegister = function() {

        var data = $scope.registerData;

      data.image_url = 'https://pingendo.github.io/pingendo-bootstrap/assets/user_placeholder.png';
      data.user_type_business = false;
      data.username = data.email;

      if (data.password != data.confirmPassword) {

        $scope.errorMessage = "There was an error whilst registering your account. Please check your details and try again."
        return false;

      }

        ApplicationUser.create(data, function() {
          $location.path("/app/account/login");
            
        }, function(res) {
            $scope.errorMessage = "There was an error whilst registering your account. Please check your details and try again."
        });
    }; 

  }
})();
