(function() {
  'use strict';

  angular
    .module('desktop')
    .controller('StatusController', StatusController);

  /** @ngInject */
  function StatusController($scope, $rootScope, $location, $stateParams, Job) {

  	var job_id = $stateParams.id;

  	$scope.job = Job.findById({ id: job_id}, function(job) {

	  	 if($rootScope.userId == job.customer_id){
	  	 	$scope.showCustomer = true;
	  	 } else if ($rootScope.userId == job.business_id){
	  	 	$scope.showBusiness = true;
	  	 } else if(){
	  	 	$scope.showCourier = true;
	  	 };

  	}, function(err) {

  	});

  	$scope.bids = Job.bids({
  		id: $scope.job.id
  	});

  	$scope.bid = Job.bids({
  		id: $scope.job.id,
  		filter: {
  		    where: { winning_bid: true },
  		  }
  		 });

  	// $scope.showCourier = true;


  	$scope.doAcceptedFromBusiness = function() {
  		$scope.job.accepted_by_courier = true;
  		$scope.job.$save();
  	};

  	$scope.doCompletedDelivery = function() {
  		$scope.job.dropped_by_courier = true;
  		$scope.job.$save();
  	};

  	$scope.doCollectedByCourier = function() {
  		$scope.job.collected_from_business = true;
  		$scope.job.$save();
  	};

  	$scope.doReceivedByCustomer = function() {
  		$scope.job.received_by_customer = true;
  		$scope.job.$save();
  	};

  	$scope.doSelectedByCustomer = function(user_id){
  		user.
  		$scope.bid.winning_bid = true;
  		$scope.bid.$save();
  	}


  }
})();
