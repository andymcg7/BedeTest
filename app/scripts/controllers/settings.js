'use strict';

/**
 * @ngdoc function
 * @name bedefrontendtestApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller for the settings view, where the odds display and currency symbol can be chosen.
 */
angular.module('bedefrontendtestApp')
  .controller('SettingsCtrl', function ($scope, settingsService) {

    this.init = function() {
      var useDecimalOdds = settingsService.getDecimalOdds();
      $scope.radio = {};
      if (useDecimalOdds) {
        $scope.radio.value = 'decimal';
      } else {
        $scope.radio.value = 'traditional';
      }
    };
    this.init();

    $scope.currencySymbol = settingsService.getCurrencySymbol();

    $scope.saveSettings = function() {
      settingsService.setDecimalOdds($scope.radio.value === 'decimal');
      settingsService.setCurrencySymbol($scope.currencySymbol);
    };

  });
