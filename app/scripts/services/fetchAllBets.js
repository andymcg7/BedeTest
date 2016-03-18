'use strict';

/**
 * @ngdoc function
 * @name bedefrontendtestApp.service:fetchAllBetsService
 * @description
 * # fetchAllBetsService
 * Simple service to fetch all bets from the Bede market
 */

angular.module('bedefrontendtestApp')
  .service('fetchAllBetsService', function($http) {

    var fetchAllBets = function() {
      return $http.get('https://bedefetechtest.herokuapp.com/v1/markets');
    };

    return {
      fetchAllBets: fetchAllBets
    };

  });
