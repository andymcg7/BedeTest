'use strict';

/**
 * @ngdoc function
 * @name bedefrontendtestApp.controller:BettingSlipCtrl
 * @description
 * # BettingSlipCtrl
 * Controller for the betting slip
 */
angular.module('bedefrontendtestApp')
  .controller('BettingSlipCtrl', function ($scope, addBetService, displayOddsService,
                                           settingsService, placeBetService, placedBetService) {
    $scope.displayOdds = displayOddsService.displayOdds;
    $scope.currencySymbol = settingsService.getCurrencySymbol();
    $scope.bets = addBetService.getBets();
    $scope.allBetsAddedSuccessfully = false;
    $scope.partialSuccess = false;
    $scope.completeFailure = false;

    $scope.removeBet = function(bet) {
      var index = $scope.bets.indexOf(bet);
      if (index > -1) {
        $scope.bets.splice(index, 1);
      }
    };

    $scope.placeBets = function() {
      var betsToPlace = $scope.bets.length;
      var betsPlacedSuccessfully = 0;
      var errors = 0;

      var copyOfBets = [];
      angular.copy($scope.bets, copyOfBets);

      clearResultFlags();

      for (var i=0; i< betsToPlace; i++) {

        /* This is almost certainly not the best way of doing this.
           I couldn't find a satisfactory way of unit testing parts of this, so that's probably a confirmation that there
           must be a better way of chaining together placing multiple bets.
         */

        /*jshint -W083 */
        (function (i) {
          $scope.loadingPromise = placeBetService.placeBet(copyOfBets[i]).then(function successCallback(response) {
            betsPlacedSuccessfully++;

            // remove this object from $scope.bets
            function findBet(bet) {
              return bet.bet_id === response.data.bet_id;
            }
            // Remove this bet from our betting slip
            $scope.removeBet($scope.bets.find(findBet));

            // save it in our placed bets service
            placedBetService.addBet(response.data);
          }, function errorCallback() {
            errors++;
          }).finally(function() {
            if ((betsPlacedSuccessfully + errors) === betsToPlace) {
              placeBetsCompleted(betsPlacedSuccessfully, errors);
            }
          });
        })(i);
      }
    };

    var clearResultFlags = function() {
      $scope.allBetsAddedSuccessfully = false;
      $scope.partialSuccess = false;
      $scope.completeFailure = false;
    };

    var placeBetsCompleted = function(successCount, errorCount) {
      clearResultFlags();

      if (errorCount === 0) {
        $scope.allBetsAddedSuccessfully = true;
      } else if (successCount > 0 && errorCount > 0) {
        $scope.partialSuccess = true;
      } else {
        $scope.completeFailure = true;
      }
    };

  });
