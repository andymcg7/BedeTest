'use strict';

/**
 * @ngdoc function
 * @name bedefrontendtestApp.service:calculatePayoutService
 * @description
 * # calculatePayoutService
 * Service to calculate the payout for a given set of odds and a stake
 */

angular.module('bedefrontendtestApp')
  .service('calculatePayoutService', function() {

    var calculatePayout = function(odds, stake) {
      if (isNaN(stake) || odds.denominator === 0) {
        return '';
      }
      var numerator = Number(odds.numerator);
      var denominator = Number(odds.denominator);
      return ((numerator / denominator) * stake) + stake;
    };

    return {
      calculatePayout: calculatePayout
    };

  });
