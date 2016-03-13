(function() {
  'use strict';

  angular
    .module('desktop')
    .controller('AvailableJobsController', AvailableJobsController);

  /** @ngInject */
  function AvailableJobsController($scope, $rootScope, $location, $http, Job) {

    var userId = localStorage.getItem("userID");

    if (userId == null)
    {
      $location.path("/app/account/login/app.jobs.availablejobs");
    }

  	$scope.map = { center: { latitude: 55, longitude: -6}, zoom: 8 };

  	$scope.mapMarkers = [
          { id: 1, imgPath: '/assets/images/map-marker-orange.png', coords : {latitude: 55.132126, longitude:  -6.322044 } },
        ];

    Job.find({filter: { where: {and: [{customer_id:{neq: userId}}, {bidding_complete: false}] }} }, function(res) {

      angular.forEach(res, function(v) {

        $scope.jobs = [];

        v.imgPath = '/assets/images/map-marker-orange.png'; 
        getLatLngForPostcode(v.location).then(function(pcres) {

          v.coords = {latitude: pcres.data.results[0].geometry.location.lat, longitude:  pcres.data.results[0].geometry.location.lng };
          $scope.jobs.push(v);
        }); 

      }); 

    }, function(err) {

    });

    $scope.doSearch = function() {

      $scope.jobs = [];

      Job.find({filter: {where: {and: [{bidding_complete: false}, {location: { like: $scope.jobSearchQuery } }]}}  }, function(res) {

        angular.forEach(res, function(v) {

          v.imgPath = '/assets/images/map-marker-orange.png'; 
          getLatLngForPostcode(v.location).then(function(pcres) {

            v.coords = {latitude: pcres.data.results[0].geometry.location.lat, longitude:  pcres.data.results[0].geometry.location.lng };
            $scope.jobs.push(v);
          }); 

        }); 

      }, function(err) {

      });

    };

    var getLatLngForPostcode = function(postcode) {

      var urlBase = "http://maps.googleapis.com/maps/api/geocode/json?address={PC},+UK&sensor=false"; 

      urlBase = urlBase.replace("{PC}", postcode);

      console.log(urlBase);

      var webPromise = $http({
        method: 'GET',
        url: urlBase
      });

      return webPromise;
    }


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
