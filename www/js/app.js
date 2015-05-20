// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl'
            })

            .state('app.search', {
                url: "/search",
                views: {
                    'menuContent': {
                        templateUrl: "templates/search.html",
                        controller: "SearchCtrl"
                    }
                }
            })

            .state('app.applications', {
                url: "/applications",
                views: {
                    'menuContent': {
                        templateUrl: "templates/applications.html",
                        controller: 'ApplicationsCtrl'
                    }
                }
            })
            .state('app.application', {
                url: "/applications/:applicationId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/application.html",
                        controller: 'ApplicationCtrl'
                    }
                }
            })
            .state('app.addApplication', {
                url: "/addApplication",
                views: {
                    'menuContent': {
                        templateUrl: "templates/addApplication.html",
                        controller: 'AddApplicationCtrl'
                    }
                }
            })
            .state('app.fullstopViolations', {
                url: "/fullstopViolations",
                views: {
                    'menuContent': {
                        templateUrl: "templates/fullstopViolations.html",
                        controller: 'FullstopViolationsCtrl'
                    }
                }
            })
            .state('app.violation', {
                url: "/fullstopViolations/:violationId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/violation.html",
                        controller: 'ViolationCtrl'
                    }
                }
            })
            .state('app.github', {
                url: "/github",
                views: {
                    'menuContent': {
                        templateUrl: "templates/github.html",
                        controller: 'GithubCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/applications');
    });
