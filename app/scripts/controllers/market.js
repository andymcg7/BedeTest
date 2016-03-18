'use strict';

/**
 * @ngdoc function
 * @name bedefrontendtestApp.controller:MarketCtrl
 * @description
 * # MarketCtrl
 * Controller for the market, where all available bets are listed
 */
angular.module('bedefrontendtestApp')
  .controller('MarketCtrl', function ($scope, $http, $location, addBetService, displayOddsService,
                                    fetchAllBetsService, marketStateService) {

    $scope.displayOdds = displayOddsService.displayOdds;
    $scope.noConnection = false;
    $scope.noBetsFound = false;

    // Initialise, fetch all of the available bets, and categorise them by event so it doesn't matter which order the bets are returned
    // From the server, they will always be displayed in order.
    // There is some inefficiency here, and the categorising may be better done in a service
    this.init = function() {
      if (marketStateService.getAvailableEvents().length === 0) {
        $scope.loadingPromise = fetchAllBetsService.fetchAllBets().then(function successCallback(response) {
          $scope.availableEvents = [];

          // Function to check if an event has been added to our list of events
          var eventAlreadyExists = function (event) {
            for (var i = 0; i < $scope.availableEvents.length; i++) {
              if ($scope.availableEvents[i].event === event) {
                return $scope.availableEvents[i];
              }
            }
            return undefined;
          };

          // Categorise our bets into their events
          for (var i = 0; i < response.data.length; i++) {
            var event = eventAlreadyExists(response.data[i].event);
            if (!event) {
              $scope.availableEvents.push({'event': response.data[i].event, 'bets': [response.data[i]]});
            } else {
              event.bets.push(response.data[i]);
            }
          }

          if ($scope.availableEvents.length === 0) {
            // The market didn't return any bets, display appropriate error message
            $scope.noBetsFound = true;
          } else {
            // Save the events and bets in our state service
            marketStateService.setAvailableEvents($scope.availableEvents);

            $scope.eventClicked($scope.availableEvents[0]);

            // Unpleasant hack needed to refresh our list of available events, without this the last event does not appear for some reason
            setTimeout(function () {
              $scope.$apply();
            }, 0);
          }
        }, function errorCallback() {
          // Couldn't get anything back from the market, display appropriate error message
          $scope.noConnection = true;
        });
      } else {
        $scope.availableEvents = marketStateService.getAvailableEvents();
        $scope.selectedEvent = marketStateService.getSelectedEvent();

        // If no event already selected, choose the first one
        if (!$scope.selectedEvent) {
          $scope.eventClicked($scope.availableEvents[0]);
        }
      }
    };

    $scope.eventClicked = function(event) {
      // Set the selected event, and save it to the service so it is remembered if we leave this view
      $scope.selectedEvent = event;
      marketStateService.setSelectedEvent(event);
    };

    $scope.addBet = function(item) {
      // Add the bet to the service, then change view to the betting slip so the stake can be entered
      addBetService.addBet(item);
      $location.path('bettingSlip');
    };

    // As the initialisation is in a function run it now
    this.init();
  });
