'use strict';

angular.module('Login').controller('LoginController',
function ($scope, LoginRequest, LoginResponse, HttpRequestService) {
  $scope.pageName = "Login";

  $scope.request = new LoginRequest();
  $scope.response = LoginResponse;

  $scope.response.loadDetail();

});
