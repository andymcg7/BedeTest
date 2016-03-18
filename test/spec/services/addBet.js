'use strict';

describe('addBet tests', function (){
  var addBetService;
  var bet1 = {'bet_id': 1, 'event': 'next world cup', 'name': 'Brazil', 'odds': {'numerator': 3, 'denominator': 1}, 'stake': 10};

  beforeEach(function () {

    module('bedefrontendtestApp');

    inject(function(_addBetService_) {
      addBetService = _addBetService_;
    });
  });

  it('should have an addBet function', function () {
    expect(angular.isFunction(addBetService.addBet)).toBe(true);
  });

  it('should have an getBets function', function () {
    expect(angular.isFunction(addBetService.getBets)).toBe(true);
  });

  it('should add a bet', function () {
    // Result should be true as the bet is not already present
    var result = addBetService.addBet(bet1);
    expect(result).toBe(true);
  });

  it('should not add a bet if the bet is already present', function () {
    // Result should be true as the bet is not already present
    addBetService.addBet(bet1);
    var result = addBetService.addBet(bet1);
    expect(result).toBe(false);
  });

  it('should return 1 bet when accessing getBets after adding 1', function () {
    addBetService.addBet(bet1);
    var result = addBetService.getBets();
    expect(result.length).toBe(1);
  });

});
