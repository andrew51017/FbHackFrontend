(function() {
  'use strict';

  angular
    .module('desktop', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap', 'lbServices', 'uiGmapgoogle-maps'])
    .config(config);

  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('store', {
        url: '/store',
        templateUrl: 'app/shopdemo/store.html',
        controller: 'StoreController'
      })
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('app', {
        url: '/app',
        templateUrl: 'app/layout/layout.html',
        abstract: true
      })
      .state('app.account', {
        url: '/account',
        templateUrl: 'app/layout/uiview.html',
        abstract: true
      })
      .state('app.account.login', {
        url: '/login',
        templateUrl: 'app/account/login.html',
        controller: 'LoginController',
        controllerAs: 'account'
      })
      .state('app.account.register', {
        url: '/register',
        templateUrl: 'app/account/register.html',
        controller: 'RegisterController',
        controllerAs: 'account'
      })
      .state('app.jobs', {
        url: '/jobs',
        templateUrl: 'app/layout/uiview.html',
        abstract: true
      })
      .state('app.jobs.myjobs', {
        url: '/my',
        templateUrl: 'app/jobs/myjobs.html',
        controller: 'MyJobsController'
      })
      .state('app.jobs.availablejobs', {
        url: '/available',
        templateUrl: 'app/jobs/availablejobs.html',
        controller: 'AvailableJobsController'
      })
      .state('app.jobs.status', {
        url: '/status/:id',
        templateUrl: 'app/jobs/status.html',
        controller: 'StatusController'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
