'use strict';

/**
 * @ngdoc function
 * @name bedefrontendtestApp.service:calculateBestPayoutService
 * @description
 * # calculateBestPayoutService
 * Service to calculate the best payout for a series of bets.
 * This isn't as straightforward as just totalling up the payouts. The service needs to take into account that multiple bets
 * on different teams for the same event cannot pay out - only 1 team can win. The best possible payout should be returned for each event.
 * To further complicate, there could be multiple bets on the same team in the same event. The service must take all of this into account.
 */

angular.module('bedefrontendtestApp')
  .service('calculateBestPayoutService', function(calculatePayoutService) {

    var calculateBestPayout = function(bets) {

      // go through all of the placed bets and calculate the payout
      // For multiple bets on the same event we need to use the highest value (as only 1 bet can succeed)
      var calculatedBets = [];

      var event, bet_id;

      function findBetByBetId(bet) {
        return bet.bet_id === bet_id;
      }

      function findBetByEvent(bet) {
        return bet.event === event;
      }

      for (var i = 0 ; i < bets.length ; i++) {
        var betPayout = calculatePayoutService.calculatePayout(bets[i].odds, bets[i].stake);

        bet_id = bets[i].bet_id;

        // Check if this combination of event and name has already been bet on
        var calculatedPayoutObject = calculatedBets.find(findBetByBetId);
        if (calculatedPayoutObject) {
            calculatedPayoutObject.betPayout += betPayout;
        } else {
          calculatedBets.push({'bet_id': bets[i].bet_id, 'event': bets[i].event, 'name': bets[i].name, 'betPayout': betPayout});
        }
      }

      var payoutArray = [];

      // now we've consolidated potential multiple bets on the same event & name
      // work out the highest return for each event
      for (i = 0 ; i < calculatedBets.length ; i++) {
        event = calculatedBets[i].event;
        var payoutArrayBet = payoutArray.find(findBetByEvent);

        if (payoutArrayBet) {
          if (calculatedBets[i].betPayout > payoutArrayBet.betPayout) {
            payoutArrayBet.betPayout = calculatedBets[i].betPayout;
          }
        } else {
          payoutArray.push({'event': event, 'betPayout': calculatedBets[i].betPayout});
        }
      }

      // now we've got the highest values for each event, sum them
      var totalPayout = 0;

      for (i = 0 ; i < payoutArray.length ; i++) {
        totalPayout += payoutArray[i].betPayout;
      }
      return totalPayout;
    };

    return {
      calculateBestPayout: calculateBestPayout
    };

  });
