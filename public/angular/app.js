var app = angular.module('RiceEats', ['ngRoute']).run(function () {})

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/templates/main.html',
            controller: 'mainCtrl'
        })
})

app.factory('menuService', function($http) {
    var factory = {}
    factory.getMenus = function() {
        return $http.get('/api/todaysmenu');
    }
    return factory;
})