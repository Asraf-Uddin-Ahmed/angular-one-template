angular.module('MyApp.services').
factory('AngularWebService', ['$resource', '$q', function ($resource, $q ) {
    'use strict';

    return {

        save: function (project, url) {

            var defer = $q.defer();

            console.log('output:2')
            console.log(url);

            var resource = $resource(url);

            resource.save(project, function (response) {

                defer.resolve(response);

            }, function (error) {

                return defer.reject(error);

            });

            return defer.promise;
        },

        getAll: function (url) {

            var defer = $q.defer();

            var resource = $resource(url);

            resource.get(function (response) {

                defer.resolve(response);

            }, function (error) {

                return defer.reject(error);

            });

            return defer.promise;
        },

        getdetailById: function (url, id) {

            var defer = $q.defer();

            var resource = $resource(url + '?id=' + id);

            resource.get(function (response) {

                defer.resolve(response);

            }, function (error) {

                return defer.reject(error);

            });

            return defer.promise;
        },

        remove: function (url, id) {

            var defer = $q.defer();

            var resource = $resource(baseUrl + '?id=' + id);

            resource.delete(function (response) {

                defer.resolve(response);

            }, function (error) {

                return defer.reject(error);

            });

            return defer.promise;
        }
    };
}]);
