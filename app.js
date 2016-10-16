
angular.module('MyApp.directives', []);
angular.module('MyApp.filters', []);
angular.module('MyApp.services', []);
angular.module('MyApp.configs', []);
angular.module('MyApp.components', []);
angular.module('MyApp.models', []);

angular.module('Dashboard', []);
angular.module('Store', []);
angular.module('Base', [
  'Dashboard',
  'Store'
]);

var myApp = angular.module('MyApp', [
  'MyApp.directives',
  'MyApp.filters',
  'MyApp.services',
  'MyApp.configs',
  'MyApp.components',
  'MyApp.models',
  'Base',
  'ngRoute',
  'ngCookies',
  'ngResource'
]);

myApp.controller('NavCtrl', ['$scope', '$location', function ($scope, $location) {

}]);

myApp.config(function ($routeProvider) {
  'use strict';
  $routeProvider
  .when('/store', {
    controller: 'StoreController',
    templateUrl: 'module/store/store.html',
    requireLogin : true
  })
  .when('/dashboard', {
    controller: 'DashboardController',
    templateUrl: 'module/dashboard/dashboard.html',
    requireLogin : true
  })
  .otherwise({redirectTo: '/dashboard'});
});
