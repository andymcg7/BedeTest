'use strict';

describe('placedBets controller tests', function () {
  var displayOddsServiceMock, settingsServiceMock, placedBetsServiceMock, calculateBestPayoutServiceMock;
  var $scope, ctrl;

  var bets = [{
    'bet_id': 1,
    'event': 'next world cup',
    'name': 'Brazil',
    'odds': {'numerator': 3, 'denominator': 1},
    'possiblePayout': 40,
    'stake': 10,
    'transaction_id': 12345
  },
    {
      'bet_id': 2,
      'event': 'next world cup',
      'name': 'Spain',
      'odds': {'numerator': 3, 'denominator': 1},
      'possiblePayout': 40,
      'stake': 10,
      'transaction_id': 12343
    }];

  beforeEach(function () {

    displayOddsServiceMock = jasmine.createSpyObj('displayOddsService', ['displayOdds']);
    displayOddsServiceMock.displayOdds.and.callFake(function () {
      return '3 to 1';
    });

    settingsServiceMock = jasmine.createSpyObj('settingsService', ['getCurrencySymbol']);
    settingsServiceMock.getCurrencySymbol.and.callFake(function () {
      return '$';
    });

    placedBetsServiceMock = jasmine.createSpyObj('placedBetsService', ['getBets']);
    placedBetsServiceMock.getBets.and.callFake(function () {
      return bets;
    });

    calculateBestPayoutServiceMock = jasmine.createSpyObj('calculateBestPayoutService', ['calculateBestPayout']);
    calculateBestPayoutServiceMock.calculateBestPayout.and.callFake(function () {
      return 40;
    });

    module('bedefrontendtestApp');

    inject(function ($rootScope, $controller) {
      $scope = $rootScope.$new();

      ctrl = $controller('PlacedBetsCtrl', {
        $scope: $scope,
        displayOddsService: displayOddsServiceMock,
        settingsService: settingsServiceMock,
        placedBetService: placedBetsServiceMock,
        calculateBestPayoutService: calculateBestPayoutServiceMock
      });
    });
  });

  it('should call displayOdds', function () {
    var result = $scope.displayOdds({});
    expect(result).toBe('3 to 1');
  });

  it('should have called getCurrencySymbol', function () {
    expect($scope.currencySymbol).toBe('$');
  });

  it('should call getBets', function () {
    expect($scope.bets).toEqual(bets);
  });

  it('should call calculateBestPayout', function () {
    expect($scope.bestPayout).toEqual(40);
  });
});
