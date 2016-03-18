'use strict';

describe('settingsService tests', function (){
  var settingsService;
  var localStorageService;

  beforeEach(function () {

    // load the module.
    module('LocalStorageModule');
    module('bedefrontendtestApp');

    inject(function(_settingsService_, _localStorageService_) {
      settingsService = _settingsService_;
      localStorageService = _localStorageService_;
    });
  });

  it('should have an getCurrencySymbol function', function () {
    expect(angular.isFunction(settingsService.getCurrencySymbol)).toBe(true);
  });

  it('should have an setCurrencySymbol function', function () {
    expect(angular.isFunction(settingsService.setCurrencySymbol)).toBe(true);
  });

  it('should have an getDecimalOdds function', function () {
    expect(angular.isFunction(settingsService.getDecimalOdds)).toBe(true);
  });

  it('should have an setDecimalOdds function', function () {
    expect(angular.isFunction(settingsService.setDecimalOdds)).toBe(true);
  });

  it('should have an return a default of false for using decimal odds', function () {
    spyOn(localStorageService, 'get').and.returnValue(null);
    var result = settingsService.getDecimalOdds();
    expect(result).toBe(false);
  });

  it('should return a stored value for decimal odds', function () {
    spyOn(localStorageService, 'get').and.returnValue(true);
    var result = settingsService.getDecimalOdds();
    expect(result).toBe(true);
  });

  it('should allow setting decimal odds', function () {
    settingsService.setDecimalOdds(true);
    var result = settingsService.getDecimalOdds();
    expect(result).toBe(true);
  });

  it('should have an return a default of £ for currency symbol', function () {
    spyOn(localStorageService, 'get').and.returnValue(null);
    var result = settingsService.getCurrencySymbol();
    expect(result).toBe('£');
  });

  it('should return a stored value for currency symbol', function () {
    localStorageService.set('currency', '$');
    var result = settingsService.getCurrencySymbol();
    expect(result).toBe('$');
  });

  it('should allow setting currency', function () {
    settingsService.setCurrencySymbol('$');
    var result = settingsService.getCurrencySymbol();
    expect(result).toBe('$');
  });
});
