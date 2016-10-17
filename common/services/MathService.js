'use strict';

angular.module("MyApp.services").factory('MathService',function() {

	var objToReturn = {};

	/*
	* Private
	*/
	var DEFAULT_PRECISION = 6;

	/*
	* Public
	*/
	var getFixedValue = function(number, precision) {
		return number.toFixed(precision) * 1;
	}
	var getFixedValueWithDefaultPrecision = function(number) {
		return getFixedValue(number, DEFAULT_PRECISION);
	}

	objToReturn.getFixedValue = getFixedValue;
	objToReturn.getFixedValueWithDefaultPrecision = getFixedValueWithDefaultPrecision;
	return objToReturn;
});
