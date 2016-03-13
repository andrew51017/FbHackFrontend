(function() {
  'use strict';

  angular
    .module('desktop')
    .controller('StatusController', StatusController);

  /** @ngInject */
  function StatusController($scope, $rootScope, $location, $stateParams, Job, Bid) {

  	var userId = localStorage.getItem("userID");

  	if (userId == null)
  	{
  		$location.path("/app/account/login/app.status");
  	}

  	var job_id = $stateParams.id;

  	$scope.job = Job.findById({ id: job_id}, function(job) {

  		$scope.winner = Job.bids({
  			id: $scope.job.id,
  			filter: {
  			    where: { winning_bid: true },
  			  }
  			 });

  		$scope.biddingComplete = job.bidding_complete;

	  	 if($rootScope.userId == job.customer_id){
	  	 	$scope.showCustomer = true;
	  	 } else if ($rootScope.userId == job.business_id){
	  	 	$scope.showBusiness = true;
	  	 } else if ($rootScope.userId == $scope.winner.user_id){
	  	 	$scope.showCourier = true;
	  	 };

	  	 if($scope.job.accepted_by_courier == false){
	  	 	$scope.collected = false;
	  	 } else {
	  	 	$scope.collected = true;
	  	 };


	  	 if($scope.job.dropped_by_courier == false){
	  	 	$scope.complete = false;
	  	 }
	  	 else {
	  	 	$scope.complete = true;
	  	 }


	  	 if($scope.job.collected_from_business == false){
	  	 	$scope.picked_up = false;
	  	 }
	  	 else {
	  	 	$scope.picked_up = true;
	  	 }


	  	 if($scope.job.received_by_customer == false){
			$scope.received = false;
	  	 }
	  	 else {
	  	 	$scope.received = true; 
	  	 }

		$scope.bids = Bid.find({
		  filter: { job_id: job.id }
		});	  


  	}, function(err) {
  		// $scope.showCourier = true;

  	});


  	$scope.doAcceptedFromBusiness = function() {
  		$scope.collected = true;
  		$scope.job.accepted_by_courier = true;
  		$scope.job.$save();
  	};

  	$scope.doCompletedDelivery = function() {
  		$scope.complete = true;
  		$scope.job.dropped_by_courier = true;
  		$scope.job.$save();
  	};

  	$scope.doCollectedByCourier = function() {
  		$scope.picked_up = true;
  		$scope.job.collected_from_business = true;
  		$scope.job.$save();
  	};

  	$scope.doReceivedByCustomer = function() {
  		$scope.received = true;
  		$scope.job.received_by_customer = true;
  		$scope.job.$save();
  	};

  	$scope.doSelectedByCustomer = function(bid){

  		Jobs.findById({ id: bid.job_id}, function(res) {

  			bid.winning_bid = true; 
  			bid.$save();

  			res.bidding_complete = true; 
  			res.$save();

  			$location.path('/app/jobs/status/' + bid.job_id);

  		}, function(err) {

  		});

  	}


  }
})();
