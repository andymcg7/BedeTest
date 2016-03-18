'use strict';

/**
 * @ngdoc function
 * @name bedefrontendtestApp.controller:PlacedBetsCtrl
 * @description
 * # PlacedBetsCtrl
 * Controller for the placed bets view - for bets that have already been placed
 */
angular.module('bedefrontendtestApp')
  .controller('PlacedBetsCtrl', function ($scope, displayOddsService, settingsService, placedBetService, calculateBestPayoutService) {
    $scope.displayOdds = displayOddsService.displayOdds;
    $scope.currencySymbol = settingsService.getCurrencySymbol();
    $scope.bets = placedBetService.getBets();
    $scope.bestPayout = calculateBestPayoutService.calculateBestPayout($scope.bets);
  });
