var app = angular.module("app", ["ngRoute"]);

var configFunc = function ($routeProvider) {

    $routeProvider.when("/home", {
        templateUrl: "/views/home.html",
        controller: "HomeController"
    });

    $routeProvider.otherwise({ redirectTo: "/home" });
};

configFunc.$inject = ["$routeProvider"];
app.config(configFunc);