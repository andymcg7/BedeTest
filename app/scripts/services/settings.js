'use strict';

/**
 * @ngdoc function
 * @name bedefrontendtestApp.controller:settingsService
 * @description
 * # settingsService
 * Service to handle saving and loading of the user's settings for currency and odds display. The settings are stored using browser local storage.
 */

angular.module('bedefrontendtestApp')
  .service('settingsService', function(localStorageService) {

    var useDecimalOdds;
    var currencySymbol;

    var setDecimalOdds = function(decimal) {
      useDecimalOdds = decimal;
      localStorageService.set('decimalOdds', decimal);
    };

    var getDecimalOdds = function() {
      if (useDecimalOdds === undefined) {
        var decimalOdds = localStorageService.get('decimalOdds');
        if (decimalOdds === undefined || decimalOdds === null) {
          setDecimalOdds(false);
          return false;
        } else {
          return decimalOdds;
        }
      } else {
        return useDecimalOdds;
      }
    };

    var setCurrencySymbol = function(symbol) {
      currencySymbol = symbol;
      localStorageService.set('currency', symbol);
    };

    var getCurrencySymbol = function() {
      if (currencySymbol === undefined) {
        var currency = localStorageService.get('currency');
        if (currency === undefined || currency === null) {
          setCurrencySymbol('£');
          return '£';
        } else {
          return currency;
        }
      } else {
        return currencySymbol;
      }
    };

    return {
      getDecimalOdds: getDecimalOdds,
      setDecimalOdds: setDecimalOdds,
      getCurrencySymbol: getCurrencySymbol,
      setCurrencySymbol: setCurrencySymbol
    };

  });
