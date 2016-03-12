(function() {
  'use strict';

  angular
    .module('desktop', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap', 'lbServices'])
    .config(config);

  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
