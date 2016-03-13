(function() {
  'use strict';

  angular
    .module('desktop')
    .controller('StoreController', StoreController);

  /** @ngInject */
  function StoreController($scope, $rootScope, $location, ApplicationUser, Job) {

  		var userId = localStorage.getItem("userID");

  		if (userId == null)
  		{
  			$location.path("/app/account/login/store");
  		}

  		$scope.submitJob = function() {

	  		var job = {
			  "title": "Ship a CPU",
			  "description": "Shipping of a CPU from Computer Store Warehouse to Durham.",
			  "location": "NW1 3FG",
			  "destination": $scope.orderDetails.postcode,
			  "item_price": 129,
			  "job_price": 0,
			  "date_added": "2016-03-13",
			  "date_ending": "2016-03-13",
			  "received_by_customer": false,
			  "dropped_by_courier": false,
			  "accepted_by_courier": false,
			  "collected_from_business": false,
			  "customer_id": userId,
			  "business_id": 1
			}; 


			Job.create(job);

  		}; 

  }
})();
