'use strict';

angular.module('Login').factory('LoginRequest',
function() {

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
			var scope = this;
			scope.foo();
			console.log(this);
		}
	};

	return LoginRequest;
});
