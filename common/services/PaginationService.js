'use strict';

angular.module("MyApp.services").factory('PaginationService', function() {
	
	var objToReturn = {};

	/*
	* Private
	*/

	/*
	* Public
	*/
	var getPagination = function(responsePagination) {
		var pagination = {
			displayStart : responsePagination.displayStart,
			displaySize : responsePagination.displaySize,
			sortedAttribute : responsePagination.sortedAttribute,
			sortingOrder : responsePagination.sortingOrder,
			totalContent : responsePagination.totalContent,
			totalPage : Math
			.ceil(responsePagination.totalContent
				/ responsePagination.displaySize),
				currentPageNumber : (responsePagination.displayStart / responsePagination.displaySize) + 1,

				getPageNumber : function(num) {
					return new Array(num);
				},
				isCurrentPage : function(pageNumber) {
					return pageNumber === this.currentPageNumber;
				},
				getTotalContentInPage : function() {
					var nextNumberOfContent = responsePagination.totalContent
					- responsePagination.displayStart;
					return nextNumberOfContent > responsePagination.displaySize ? responsePagination.displaySize
					: nextNumberOfContent;
				},
				hasSingleRecordInPage : function() {
					return this.getTotalContentInPage() === 1;
				}
			};
			return pagination;
		}

		objToReturn.getPagination = getPagination;
		return objToReturn;
	});
