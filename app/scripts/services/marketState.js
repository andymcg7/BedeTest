'use strict';

/**
 * @ngdoc function
 * @name bedefrontendtestApp.service:marketStateService
 * @description
 * # marketStateService
 * Service to maintain the current list of bets in the market, and the currently selected event. This is to ensure correct presentation
 * when the user moves from one view to another. In the real world the available events cache may not be wanted.
 */

angular.module('bedefrontendtestApp')
  .service('marketStateService', function() {

    var availableEvents = [];
    var selectedEvent;

    return {
      getAvailableEvents: function() { return availableEvents; },
      setAvailableEvents: function(events) { availableEvents = events; },
      getSelectedEvent: function() { return selectedEvent; },
      setSelectedEvent: function(event) { selectedEvent = event; }
    };

  });
