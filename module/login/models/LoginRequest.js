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
			AuthService.login(this).then(function (response) {
				console.log(response);
				$location.path('/profile');
			}, function (err) {
				console.log(err);
				// $scope.message = err.error_description;
			});
		}
	};

	return LoginRequest;
});
