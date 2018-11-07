(function() {
  'use strict';

  angular
    .module('walleWidgetsApp')
    .config(appConfig);

  appConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function appConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    $stateProvider.state('home', {
      url: '/widgets',
      controller: 'WidgetsController',
      templateUrl: 'src/templates/widgets.html'
    });

    $urlRouterProvider.otherwise('/widgets');
  }
}());
