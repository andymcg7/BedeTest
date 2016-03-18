'use strict';

/**
 * @ngdoc overview
 * @name bedefrontendtestApp
 * @description
 * # bedefrontendtestApp
 *
 * Main module of the application.
 */
angular
  .module('bedefrontendtestApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'cgBusy',
    'fiestah.money',
    'LocalStorageModule'
  ])
  .config(['localStorageServiceProvider', function(localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('bede');
  }])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/market.html',
        controller: 'MarketCtrl'
      })
      .when('/bettingSlip', {
        templateUrl: 'views/bettingSlip.html',
        controller: 'BettingSlipCtrl'
      })
      .when('/placedBets', {
        templateUrl: 'views/placedBets.html',
        controller: 'PlacedBetsCtrl'
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
