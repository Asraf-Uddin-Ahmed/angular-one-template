'use strict';

angular.module('Login').factory('LoginRequest',
function(AuthService, $location) {

	function LoginRequest() {
		this.init();
	}

	LoginRequest.prototype = {
		init : function() {
			console.log("init LoginRequest");
		},
		foo: function(){
			console.log("this is foo");
		},
		loginUser: function() {
			this.foo();
			console.log(this);
			AuthService.login(this);
			$location.path('/profile');
			// AuthService.login().then(function (response) {
			// 	$location.path('/profile');
			// }, function (err) {
			// 	// $scope.message = err.error_description;
			// });
		}
	};

	return LoginRequest;
});
