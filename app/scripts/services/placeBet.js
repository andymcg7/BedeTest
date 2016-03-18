'use strict';

/**
 * @ngdoc function
 * @name bedefrontendtestApp.service:placeBetService
 * @description
 * # placeBetService
 * Service to place a single bet from the user's betting slip.
 */

angular.module('bedefrontendtestApp')
  .service('placeBetService', function($http) {

    var placeBet = function(bet) {
      var betToPlace = {'bet_id': bet.bet_id, 'odds': bet.odds, 'stake': bet.stake};
      return $http.post('https://bedefetechtest.herokuapp.com/v1/bets', betToPlace);
    };

    return {
      placeBet: placeBet
    };

  });
