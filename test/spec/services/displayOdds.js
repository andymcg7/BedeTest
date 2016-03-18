'use strict';

describe('displayOdds tests', function (){
  var displayOddsService;
  var settingsServiceMock;

  var bet1 = {'bet_id': 1, 'event': 'next world cup', 'name': 'Brazil', 'odds': {'numerator': 3, 'denominator': 1}, 'stake': 10};
  var bet2 = {'bet_id': 1, 'event': 'next world cup', 'name': 'Brazil', 'odds': {'numerator': 1, 'denominator': 1}, 'stake': 10};

  beforeEach(function () {

    // load the module.
    module('bedefrontendtestApp', function($provide) {

      settingsServiceMock = jasmine.createSpyObj('settingsService', ['getDecimalOdds', 'getCurrencySymbol']);

      $provide.value('settingsService', settingsServiceMock);
    });

    inject(function(_displayOddsService_) {
      displayOddsService = _displayOddsService_;
    });
  });

  it('should have an displayOdds function', function () {
    expect(angular.isFunction(displayOddsService.displayOdds)).toBe(true);
  });

  it('should display traditional odds correctly', function () {
    var result = displayOddsService.displayOdds(bet1);
    expect(result).toBe('3 to 1');
  });

  it('should display evens if the numerator and denominator are the same', function () {
    var result = displayOddsService.displayOdds(bet2);
    expect(result).toBe('Evens');
  });

  it('should display decimal odds correctly', function () {
    settingsServiceMock.getDecimalOdds.and.callFake(function() {
      return true;
    });

    var result = displayOddsService.displayOdds(bet1);
    expect(result).toBe('4.00');
  });



});
