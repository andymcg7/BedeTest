'use strict';

describe('placedBetService tests', function (){
  var placedBetService;
  var localStorageService;

  beforeEach(function () {

    // load the module.
    module('bedefrontendtestApp');

    inject(function(_placedBetService_, _localStorageService_) {
      placedBetService = _placedBetService_;
      localStorageService = _localStorageService_;
    });

    localStorageService.set('placedBets', undefined);
  });

  it('should have an addBet function', function () {
    expect(angular.isFunction(placedBetService.addBet)).toBe(true);
  });

  it('should have an getBets function', function () {
    expect(angular.isFunction(placedBetService.getBets)).toBe(true);
  });

  it('should have an return an empty array if nothing stored in local storage', function () {
    var result = placedBetService.getBets();
    expect(result.length).toBe(0);
  });

  it('should successfully add a bet', function () {
    var bet1 = {'bet_id': 1, 'event': 'next world cup', 'name': 'Brazil', 'odds': {'numerator': 3, 'denominator': 1}, 'possiblePayout': 40, 'stake': 10, 'transaction_id': 12345};
    placedBetService.addBet(bet1);
    var result = placedBetService.getBets();
    expect(result[0]).toEqual(bet1);
  });

});
