'use strict';

angular.module('Login').factory('LoginResponse',
function() {

	var objToReturn = {};

	/*
	* Private
	*/

	/*
	* Public
	*/
	var loadDetail = function() {
		objToReturn.detail = "Please sign in";
	}

	objToReturn.loadDetail = loadDetail;
	return objToReturn;
});
