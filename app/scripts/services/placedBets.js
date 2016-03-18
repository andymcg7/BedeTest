'use strict';

/**
 * @ngdoc function
 * @name bedefrontendtestApp.service:placedBetService
 * @description
 * # placedBetService
 * Service to handle storage of bets successfully placed. As the server isn't storing these bets, we use local browser storage
 * to store this info. Bets placed previously will be remembered by the local storage across visits to the site.
 */


angular.module('bedefrontendtestApp')
  .service('placedBetService', function(localStorageService, calculatePayoutService) {

    var bets = localStorageService.get('placedBets');
    if (bets === undefined || bets === null) {
      bets = [];
    }

    var addBet = function(newBet) {
      bets.push({'bet_id': newBet.bet_id, 'event': newBet.event, 'name': newBet.name, 'odds': newBet.odds, 'stake': newBet.stake,
        'transaction_id': newBet.transaction_id, 'possiblePayout': calculatePayoutService.calculatePayout(newBet.odds, newBet.stake)});
      localStorageService.set('placedBets', bets);
    };

    var getBets = function(){
      return bets;
    };

    return {
      addBet: addBet,
      getBets: getBets
    };

  });
