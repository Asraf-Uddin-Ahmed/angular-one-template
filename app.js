
angular.module('MyApp.directives', []);
angular.module('MyApp.filters', []);
angular.module('MyApp.services', []);
angular.module('MyApp.configs', []);
angular.module('MyApp.components', []);
angular.module('MyApp.models', []);

angular.module('Dashboard', []);
angular.module('Profile', []);
angular.module('Login', []);
angular.module('Base', [
  'Dashboard',
  'Profile',
  'Login'
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
  $scope.isActive = function (item) {
    return $location.path().indexOf(item) != -1;
  };
}]);

// myApp.run(function($rootScope, $location, $cookieStore, $http, $window, ApiEndPoints, $timeout)		{
//   'use strict';
//   console.log($rootScope);
//   // keep user logged in after page refresh
//   $rootScope.globals = $cookieStore.get('globalsDesigner') || {};
//   if ($rootScope.globals.currentUser) {
//     $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.authdata; // jshint ignore:line
//   }
//   $rootScope.$on('$routeChangeStart', function (event, next, current) {
//     var loggedIn = $rootScope.globals.currentUser;
//     if (next.requireLogin && !loggedIn) {
//       //TODO:: URL should not be hard coded
//       $window.location.href = ApiEndPoints.btocRedirect;
//     }
//     if(loggedIn && !parseInt($rootScope.globals.currentUser.isProfileCompleted * $rootScope.globals.currentUser.isVerified) && next.requireLogin){
//       $location.path('/profile');
//     }
//   });
//
//   //TODO:: should be in base controller
//   $rootScope.logout = function () {
//     var authdata = $rootScope.globals.authdata;
//     $timeout(function () {
//       $cookieStore.remove('globalsDesigner');
//     });
//     $http.defaults.headers.common.Authorization = 'Basic ';
//     console.log($rootScope);
//     $timeout(function () {
//       $window.location.href = ApiEndPoints.btocRedirect+'logout/'+authdata + '/';
//     });
//   };
// });

myApp.config(function ($routeProvider) {
  'use strict';
  $routeProvider
  .when('/', {
    controller: 'LoginController',
    templateUrl: 'module/login/login.html'
  })
  .when('/profile', {
    controller: 'ProfileController',
    templateUrl: 'module/profile/profile.html',
    requireLogin : true
  })
  .when('/dashboard', {
    controller: 'DashboardController',
    templateUrl: 'module/dashboard/dashboard.html'
  })
  .otherwise({redirectTo: '/'});
});
