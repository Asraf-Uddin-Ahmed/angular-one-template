
angular.module('MyApp.configs').factory('ApiEndPoints', function () {
    'use strict';
    return {
        appName: 'MyApp',
        appVersion: '1.0',
        url: 'http://localhost:43331/',
        btocRedirect: 'http://localhost:8080/runway-moda/#/'
    };
});
