'use strict';

angular.module("MyApp.services").factory('ActionMessageService', function() {

	var objToReturn = {};

	var MESSAGE = {
		ERROR: {
			type: "ERROR"
		},
		OK: {
			type: "SUCCESS"
		},
		INFO: {
			type: "INFO"
		},
		WARNING: {
			type: "WARNING"
		}
	};

	/*
	* Private
	*/

	/*
	* Public
	*/
	var getActionMessage = function(data) {
		return {
			message : data.message,
			isShow : true,
			type :  MESSAGE[data.code].type
		};
	}

	var handleError = function(errorMessage) {
		var actionMessage = getActionMessage({
			message : errorMessage,
			code : "ERROR"
		});
		actionMessage.success = false;

		return function() {
			return actionMessage;
		};
	}

	objToReturn.getActionMessage = getActionMessage;
	objToReturn.handleError = handleError;
	return objToReturn;
});
