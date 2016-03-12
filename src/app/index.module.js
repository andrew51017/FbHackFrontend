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
      });

    $urlRouterProvider.otherwise('/');
  }

})();
