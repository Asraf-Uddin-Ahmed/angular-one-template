'use strict';

angular.module('MyApp.services').factory('AuthService',
function ($http, $q, localStorageService, ApiEndPoints) {

  var authServiceFactory = {};

  var _authentication = {
    isAuth: false,
    userName: "",
    useRefreshTokens: false
  };

  var _externalAuthData = {
    provider: "",
    userName: "",
    externalAccessToken: ""
  };

  var _saveRegistration = function (registration) {

    _logOut();

    return $http.post(ApiEndPoints.url + 'accounts/create', registration).then(function (response) {
      return response;
    });

  };

  var _login = function (loginData) {
    // localStorageService.set('authorizationData', { token: "response.access_token", userName: loginData.userName, refreshToken: "response.refresh_token", useRefreshTokens: false });
    // _authentication.isAuth = true;
    // _authentication.userName = loginData.userName;
    // _authentication.useRefreshTokens = loginData.useRefreshTokens;

    loginData.useRefreshTokens = true;
    var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;
    if (loginData.useRefreshTokens) {
      data = data + "&client_id=" + ApiEndPoints.clientId;
    }

    var deferred = $q.defer();
    $http.post(ApiEndPoints.url + 'oauth/token', data, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function (response) {

      if (loginData.useRefreshTokens) {
        localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, refreshToken: response.refresh_token, useRefreshTokens: true });
      }
      else {
        localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, refreshToken: "", useRefreshTokens: false });
      }
      _authentication.isAuth = true;
      _authentication.userName = loginData.userName;
      _authentication.useRefreshTokens = loginData.useRefreshTokens;

      deferred.resolve(response);
    }).error(function (err, status) {
      _logOut();
      deferred.reject(err);
    });

    return deferred.promise;
  };

  var _logOut = function () {
    localStorageService.remove('authorizationData');
    _authentication.isAuth = false;
    _authentication.userName = "";
    _authentication.useRefreshTokens = false;
  };

  var _fillAuthData = function () {
    var authData = localStorageService.get('authorizationData');
    if (authData) {
      _authentication.isAuth = true;
      _authentication.userName = authData.userName;
      _authentication.useRefreshTokens = authData.useRefreshTokens;
    }
  };

  var _refreshToken = function () {
    var deferred = $q.defer();

    var authData = localStorageService.get('authorizationData');

    if (authData) {

      if (authData.useRefreshTokens) {

        var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + ApiEndPoints.clientId;

        localStorageService.remove('authorizationData');

        $http.post(ApiEndPoints.url + 'oauth/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
          localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: response.refresh_token, useRefreshTokens: true });
          deferred.resolve(response);
        }).error(function (err, status) {
          _logOut();
          deferred.reject(err);
        });
      }
    }
    return deferred.promise;
  };

  var _obtainAccessToken = function (externalData) {

    var deferred = $q.defer();

    $http.get(ApiEndPoints.url + 'account/external/ObtainLocalAccessToken', { params: { provider: externalData.provider, clientID: ApiEndPoints.clientId,externalAccessToken: externalData.externalAccessToken } }).success(function (response) {

      localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });

      _authentication.isAuth = true;
      _authentication.userName = response.userName;
      _authentication.useRefreshTokens = false;

      deferred.resolve(response);

    }).error(function (err, status) {
      _logOut();
      deferred.reject(err);
    });

    return deferred.promise;
  };

  var _registerExternal = function (registerExternalData) {

    var deferred = $q.defer();

    $http.post(ApiEndPoints.url + 'account/external/Register', registerExternalData).success(function (response) {

      localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });

      _authentication.isAuth = true;
      _authentication.userName = response.userName;
      _authentication.useRefreshTokens = false;

      deferred.resolve(response);

    }).error(function (err, status) {
      _logOut();
      deferred.reject(err);
    });

    return deferred.promise;

  };

  authServiceFactory.saveRegistration = _saveRegistration;
  authServiceFactory.login = _login;
  authServiceFactory.logOut = _logOut;
  authServiceFactory.fillAuthData = _fillAuthData;
  authServiceFactory.authentication = _authentication;
  authServiceFactory.refreshToken = _refreshToken;

  authServiceFactory.obtainAccessToken = _obtainAccessToken;
  authServiceFactory.externalAuthData = _externalAuthData;
  authServiceFactory.registerExternal = _registerExternal;

  return authServiceFactory;
});
