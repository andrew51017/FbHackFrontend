(function() {
  'use strict';

  angular
    .module('desktop')
    .controller('MyJobsController', MyJobsController);

  /** @ngInject */
  function MyJobsController($scope, $rootScope, $location, Job, Bid) {

  	var userId = localStorage.getItem("userID");

  	if (userId == null)
  	{
  		$location.path("/app/account/login/app.jobs.myjobs");
  	}

  	$scope.myJobs = Job.find({filter: { where: { customer_id:  userId } }});

  	Bid.find({filter: { where: { user_id:  userId } }}, function(res) {
  		
  		angular.forEach(res, function(b) {
  			getBidStatus(b);
  		}); 

  		$scope.myBids = res; 

  	}, function(err) {

  	});

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

  	var getBidStatus = function(bid) {

  		if (bid.winning_bid)
  		{
  			bid.rowStatus = "alert-success";
  		}
  		else 
  		{
  			Job.findOne({filter: { where: { id:  bid.job_id } } }, function(res) {

  				if (res.bidding_complete)
  				{
  					bid.rowStatus = "alert-danger";
  				}
  				else 
  				{
  					bid.rowStatus = "alert-info";
  				}

  			}, function(err) {

  			}); 
  		}

  	};

 

  }


})();
