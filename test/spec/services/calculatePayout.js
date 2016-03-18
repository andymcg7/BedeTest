'use strict';

describe('calculatePayout tests', function (){
  var calculatePayoutService;

  beforeEach(function () {

    // load the module.
    module('bedefrontendtestApp');

    inject(function(_calculatePayoutService_) {
      calculatePayoutService = _calculatePayoutService_;
    });
  });

  it('should have a calculatePayout function', function () {
    expect(angular.isFunction(calculatePayoutService.calculatePayout)).toBe(true);
  });

  it('should return blank string if stake is not a number', function () {
    var odds1 = {'numerator': 3, 'denominator': 1};
    var stake1 = 'not a valid stake';

    var result = calculatePayoutService.calculatePayout(odds1, stake1);
    expect(result).toBe('');
  });

  it('should return blank string if odds denominator is zero', function () {
    var odds1 = {'numerator': 3, 'denominator': 0};
    var stake1 = 10;

    var result = calculatePayoutService.calculatePayout(odds1, stake1);
    expect(result).toBe('');
  });

  it('should return the stake if numerator is zero', function () {
    var odds1 = {'numerator': 0, 'denominator': 3};
    var stake1 = 10;

    var result = calculatePayoutService.calculatePayout(odds1, stake1);
    expect(result).toBe(10);
  });

  it('should calculate payout correctly', function () {
    var odds1 = {'numerator': 3, 'denominator': 1};
    var stake1 = 10;

    var result = calculatePayoutService.calculatePayout(odds1, stake1);
    expect(result).toBe(40);
  });



});
