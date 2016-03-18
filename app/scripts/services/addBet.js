'use strict';

/**
 * @ngdoc function
 * @name bedefrontendtestApp.service:addBetService
 * @description
 * # addBetService
 * Service to handle adding bets from the market that are then viewed and edited in the betting slip
 */

angular.module('bedefrontendtestApp')
  .service('addBetService', function() {
  var bets = [];

  var addBet = function(newBet) {
    var findBet = function(bet) {
      return bet.bet_id === newBet.bet_id;
    };

    // if we already have a bet with this id in our array don't add this one
    if (!bets.find(findBet)) {
      bets.push({'bet_id': newBet.bet_id, 'event': newBet.event, 'name': newBet.name, 'odds': newBet.odds, 'stake': 0});
      return true;
    } else {
      return false;
    }
  };

  var getBets = function(){
    return bets;
  };

  return {
    addBet: addBet,
    getBets: getBets
  };

});
