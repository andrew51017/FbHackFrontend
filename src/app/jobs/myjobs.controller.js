(function() {
  'use strict';

  angular
    .module('desktop')
    .controller('MyJobsController', MyJobsController);

  /** @ngInject */
  function MyJobsController($scope, $rootScope, $location, Job) {

  	var userId = localStorage.getItem("userID");

  	if (userId == null)
  	{
  		$location.path("/app/account/login/app.jobs.myjobs");
  	}

  	$scope.myJobs = Job.find({filter: { where: { customer_id:  userId } }});

  	$scope.parseStatus = function(singleJob) {

  		if (singleJob.received_by_customer) {
  			return "Delivery complete";
  		}
  		else if (singleJob.dropped_by_courier) {
  			return "Package Delivered - awaiting confirmation from customer"; 
  		}
  		else if (singleJob.accepted_by_courier) {
  			return "Package with courier";
  		}
  		else if (singleJob.collected_from_business) {
  			return "Package collected from courier - awaiting confirmation";
  		}

  		return "Package not yet shipped";

  	}; 

  }


})();
