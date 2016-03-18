'use strict';

/**
 * @ngdoc function
 * @name bedefrontendtestApp.service:displayOddsService
 * @description
 * # displayOddsService
 * Simple service to return the odds string for a given item, taking into account the user's setting for odds presentation
 */


angular.module('bedefrontendtestApp')
  .service('displayOddsService', function(settingsService) {

    var displayOdds = function(item) {
      if (settingsService.getDecimalOdds()) {
        var odds = Number(item.odds.numerator) / Number(item.odds.denominator) + 1;
        return odds.toFixed(2);
      } else {
        if (item.odds.numerator === 1 && item.odds.denominator === 1) {
          return 'Evens';
        } else {
          return item.odds.numerator + ' to ' + item.odds.denominator;
        }
      }
    };

    return {
      displayOdds: displayOdds
    };

  });
