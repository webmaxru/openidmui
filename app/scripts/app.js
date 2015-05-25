'use strict';

/**
 * @ngdoc overview
 * @name openidmuiApp
 * @description
 * # openidmuiApp
 *
 * Main module of the application.
 */
angular
    .module('openidmuiApp', [
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'restangular',
    'ui.grid'
  ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/users', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })

.config(function (RestangularProvider) {
    RestangularProvider.setBaseUrl('/openidm/endpoint');

    RestangularProvider.setDefaultHeaders({
        'X-OpenIDM-Username': 'testuser',
        'X-OpenIDM-Password': 'Password1'
    });

    RestangularProvider.setMethodOverriders(["put", "patch"]);

    RestangularProvider.setRestangularFields({
        id: "_id"
    });

    RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
        var extractedData;
        if (operation === "getList") {
            extractedData = data.result[0].rows;
        } else {
            extractedData = data;
        }
        return extractedData;
    });



});
