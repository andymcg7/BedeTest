'use strict';

describe('betting slip controller tests', function () {
  var displayOddsServiceMock, addBetServiceMock;
  var placeBetService;
  var $scope, ctrl, $q;

  var validBet = [{
      'bet_id': 1,
      'odds': {'numerator': 3, 'denominator': 1},
      'stake': 10
    }
  ];

  var multipleBets = [{
      'bet_id': 1,
      'odds': {'numerator': 3, 'denominator': 1},
      'stake': 10
    },
    {
      'bet_id': 2,
      'odds': {'numerator': 3, 'denominator': 1},
      'stake': 15
    }
  ];

  var invalidBet = [{
      'bet_id': 1,
      'odds': {'numerator': 3, 'denominator': 1}
    },
  ];


  beforeEach(function () {

    displayOddsServiceMock = jasmine.createSpyObj('displayOddsService', ['displayOdds']);
    displayOddsServiceMock.displayOdds.and.callFake(function () {
      return '3 to 1';
    });

    addBetServiceMock = jasmine.createSpyObj('addBetService', ['addBet', 'getBets']);
    addBetServiceMock.addBet.and.callFake(function () {
    });
    addBetServiceMock.getBets.and.callFake(function () {
      return validBet;
    });

    module('bedefrontendtestApp');

    inject(function ($rootScope, $controller, _placeBetService_, _$q_) {
      $scope = $rootScope.$new();
      placeBetService = _placeBetService_;
      $q = _$q_;

      ctrl = $controller('BettingSlipCtrl', {
        $scope: $scope,
        displayOddsService: displayOddsServiceMock,
        addBetService: addBetServiceMock,
      });
    });
  });

  it('should remove a bet', function () {
    $scope.bets = multipleBets;
    var bet = multipleBets[1];

    $scope.removeBet(multipleBets[0]);
    expect($scope.bets.length).toEqual(1);
    expect($scope.bets[0]).toEqual(bet);
  });

  it('should place valid bets', function() {
    // We use the $q service to create a mock instance of defer
    var deferred1 = $q.defer();

    // Use a Jasmine Spy to return the deferred promise
    spyOn(placeBetService, 'placeBet').and.callFake(function() {
        return deferred1.promise;
    });

    // Setup the data we wish to return for the .then function in the controller
    deferred1.resolve({ 'data': validBet[0] });

    // We have to call apply for this to work
    $scope.placeBets();
    $scope.$apply();

    expect($scope.allBetsAddedSuccessfully).toEqual(true);
    expect($scope.partialSuccess).toEqual(false);
    expect($scope.completeFailure).toEqual(false);
  });

  it('should fail when placing invalid bets', function() {
    // We use the $q service to create a mock instance of defer
    var deferred1 = $q.defer();

    // Use a Jasmine Spy to return the deferred promise
    spyOn(placeBetService, 'placeBet').and.callFake(function() {
      return deferred1.promise;
    });

    // Setup the data we wish to return for the .then function in the controller
    deferred1.reject({ 'data': validBet[0] });

    // We have to call apply for this to work
    $scope.bets = invalidBet;
    $scope.placeBets();
    $scope.$apply();

    expect($scope.allBetsAddedSuccessfully).toEqual(false);
    expect($scope.partialSuccess).toEqual(false);
    expect($scope.completeFailure).toEqual(true);
  });
});
