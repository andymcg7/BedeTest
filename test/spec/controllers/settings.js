'use strict';

describe('Testing the settings ctrl', function() {
  var $scope, ctrl;

  var settingsServiceMock;

  var decimalOdds = false;
  var currencySymbol = '$';

  beforeEach(function () {

    module('bedefrontendtestApp');

    settingsServiceMock = jasmine.createSpyObj('settingsService', ['setDecimalOdds', 'getDecimalOdds', 'getCurrencySymbol', 'setCurrencySymbol']);
    settingsServiceMock.getDecimalOdds.and.callFake(function() {
      return decimalOdds;
    });
    settingsServiceMock.setDecimalOdds.and.callFake(function(decimal) {
      decimalOdds = decimal;
    });
    settingsServiceMock.getCurrencySymbol.and.callFake(function() {
      return currencySymbol;
    });
    settingsServiceMock.setCurrencySymbol.and.callFake(function(currency) {
      currencySymbol = currency;
    });

    inject(function ($rootScope, $controller) {
      $scope = $rootScope.$new();

      ctrl = $controller('SettingsCtrl', {
        $scope: $scope,
        settingsService: settingsServiceMock
      });
    });
  });


  it('should have an saveSettings function', function () {
    expect(angular.isFunction($scope.saveSettings)).toBe(true);
  });

  it('should be able to obtain the currency symbol', function () {
    expect($scope.currencySymbol).toBe('$');
  });

  it('should be able to display decimal ods', function () {
    decimalOdds = true;
    ctrl.init();
    expect($scope.radio.value).toBe('decimal');
  });

  it('should be able to alter the settings', function () {
    $scope.radio.value = 'decimal';
    $scope.currencySymbol = 'GBP';

    $scope.saveSettings();
    expect(settingsServiceMock.getDecimalOdds()).toBe(true);
    expect(settingsServiceMock.getCurrencySymbol()).toBe('GBP');
  });


});
