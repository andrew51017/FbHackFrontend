(function() {
  'use strict';

  angular
    .module('desktop')
    .controller('AvailableJobsController', AvailableJobsController);

  /** @ngInject */
  function AvailableJobsController($scope, $rootScope, $location, Job) {

  	$scope.map = { center: { latitude: 55, longitude: -6}, zoom: 8 };

  	$scope.mapMarkers = [
          { id: 1, imgPath: '/assets/images/map-marker-orange.png', coords : {latitude: 55.132126, longitude:  -6.322044 } },
        ];

    $scope.jobs = Job.find();

    // Job.find(null, function(res){
    // 	angular.forEach(res, getUserInformation);
    // 	$scope.jobs = res;
    // }, function(err){

    // });

    // var getUserInformation = function(singleJob) {

    // 	singleJob.user = ApplicationUser.findOne({ 
  		// 	filter: { where: { id: singleJob.cuustomer_id } } });

    // }
  }
})();
