'use strict';

angular.module('Dashboard').controller('DashboardController',
function ($scope) {
  $scope.pageName = 'Dashboard';

  $scope.showModal = function(){
    $scope.isModalShow = true;
  }
});
