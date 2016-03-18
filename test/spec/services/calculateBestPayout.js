'use strict';

describe('calculateBestPayout tests', function (){
  var calculateBestPayoutService;
  var bet1 = {'bet_id': 1, 'event': 'next world cup', 'name': 'Brazil', 'odds': {'numerator': 3, 'denominator': 1}, 'stake': 10};
  var bet2 = {'bet_id': 2, 'event': 'next world cup', 'name': 'Spain', 'odds': {'numerator': 4, 'denominator': 1}, 'stake': 10};
  var bet3 = {'bet_id': 3, 'event': 'ryder cup', 'name': 'Europe', 'odds': {'numerator': 3, 'denominator': 1}, 'stake': 10};
  var bet4 = {'bet_id': 1, 'event': 'next world cup', 'name': 'Brazil', 'odds': {'numerator': 3, 'denominator': 1}, 'stake': 10};

  beforeEach(function () {

    module('bedefrontendtestApp');

    inject(function(_calculateBestPayoutService_) {
      calculateBestPayoutService = _calculateBestPayoutService_;
    });
  });

  it('should have a calculateBestPayout function', function () {
    expect(angular.isFunction(calculateBestPayoutService.calculateBestPayout)).toBe(true);
  });

  it('should return zero if not bets are passed in', function () {
    var result = calculateBestPayoutService.calculateBestPayout([]);
    expect(result).toBe(0);
  });

  it('should return 40 if one bet with a payout of 40 is passed in', function () {
    var result = calculateBestPayoutService.calculateBestPayout([bet1]);
    expect(result).toBe(40);
  });

  it('should return 50 if two bets with payouts of 40 & 50 on the same event are passed in', function () {
    var result = calculateBestPayoutService.calculateBestPayout([bet1, bet2]);
    expect(result).toBe(50);
  });

  it('should return 80 if two bets on the same outcome are passed in', function () {
    var result = calculateBestPayoutService.calculateBestPayout([bet1, bet4]);
    expect(result).toBe(80);
  });

  it('should return 80 if two bets on the same outcome are passed in and a third on the same event with a smaller payout', function () {
    var result = calculateBestPayoutService.calculateBestPayout([bet1, bet2, bet4]);
    expect(result).toBe(80);
  });

  it('should return 80 if two bets with payouts of 40 & 40 on different events are passed in', function () {
    var result = calculateBestPayoutService.calculateBestPayout([bet1, bet3]);
    expect(result).toBe(80);
  });


});
