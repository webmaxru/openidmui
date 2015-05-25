'use strict';

/**
 * @ngdoc function
 * @name openidmuiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the openidmuiApp
 */
angular.module('openidmuiApp')

.controller('AboutCtrl', ['$scope', 'Restangular',
    function ($scope, Restangular) {

        $scope.gridOptions = {
            data: 'gridData',
            enableRowSelection: true,
            enableCellEditOnFocus: true,
            showSelectionCheckbox: true,
            showFooter: true,
            columnDefs: [{
                field: 'userName',
                displayName: 'Username',
                enableCellEdit: false
            }, {
                field: 'givenName',
                displayName: 'First Name',
                enableCellEdit: true
            }, {
                field: 'sn',
                displayName: 'Last Name',
                enableCellEdit: true
            }, {
                field: 'mail',
                displayName: 'E-mail',
                enableCellEdit: true
            }, {
                field: 'accountStatus',
                displayName: 'Status',
                enableCellEdit: true
            }]
        };

        var userList = Restangular.all('jqgrid');

        userList.getList({resource:'managed/user',_queryId:'get-managed-users',rows:'10',page:'1',sidx:'userName',sord:'asc'}).then(function (result) {
            $scope.gridData = result.plain();
        });

        // Does a GET to /accounts
        // Returns an empty array by default. Once a value is returned from the server
        // that array is filled with those values. So you can use this in your template
        // $scope.accounts = Restangular.all('accounts').getList().$object;

    }]);
