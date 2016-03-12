(function() {
  'use strict';

  angular
    .module('desktop')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(Job, $scope) {

    $scope.jobs = Job.find(
      { filter: { where: { id: '1' } } },
      function(list) { console.log(list); },
      function(errorResponse) { /* error */ }
    );

  }
})();
