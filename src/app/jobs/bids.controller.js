(function() {
  'use strict';

  angular
    .module('desktop')
    .controller('BidController', BidController);

  /** @ngInject */
  function BidController($scope, $rootScope, $location, $stateParams, $state, Job, Bid) {

    var userId = localStorage.getItem("userID");

    if (userId == null)
    {
      $location.path("/app/account/login/app.status");
    }

    var job_id = $stateParams.id;

    $scope.job = Job.findById({ id: job_id});

    $scope.submitBid = function() {

      var model = $scope.bid; 

      model.user_id = userId; 
      model.job_id = job_id;
      model.winning_bid = false;

      Bid.create(model, function(res) {

        $location.path("/app/jobs/my");

      }, function(err) {
        $scope.errorMessage = "Your bid could not be created."
      });

    }; 


  }

})();
