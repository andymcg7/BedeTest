'use strict';

describe('market controller tests', function () {
  var displayOddsServiceMock, addBetServiceMock, marketStateServiceMock;
  var fetchAllBetsService;
  var $scope, $location, ctrl, httpBackend;

  var bets = [{
      'bet_id': 1,
      'event': 'next world cup',
      'name': 'Brazil',
      'odds': {'numerator': 3, 'denominator': 1}
    },
    {
      'bet_id': 2,
      'event': 'next world cup',
      'name': 'Spain',
      'odds': {'numerator': 3, 'denominator': 1}
    }
  ];

  var availableEvents = [{'event':'Next World Cup','bets':[{'bet_id':1,'event':'Next World Cup','name':'England','odds':{'numerator':10,'denominator':1}},{'bet_id':2,'event':'Next World Cup','name':'Brazil','odds':{'numerator':2,'denominator':1}},{'bet_id':3,'event':'Next World Cup','name':'Spain','odds':{'numerator':3,'denominator':1}},{'bet_id':4,'event':'Next World Cup','name':'Germany','odds':{'numerator':1,'denominator':1}}]},{'event':'Ryder Cup','bets':[{'bet_id':5,'event':'Ryder Cup','name':'Europe','odds':{'numerator':7,'denominator':4}},{'bet_id':6,'event':'Ryder Cup','name':'USA','odds':{'numerator':9,'denominator':2}}]}];
  var fetchedBets = [{'bet_id':1,'event':'Next World Cup','name':'England','odds':{'numerator':10,'denominator':1}},{'bet_id':2,'event':'Next World Cup','name':'Brazil','odds':{'numerator':2,'denominator':1}},{'bet_id':3,'event':'Next World Cup','name':'Spain','odds':{'numerator':3,'denominator':1}},{'bet_id':4,'event':'Next World Cup','name':'Germany','odds':{'numerator':1,'denominator':1}},{'bet_id':5,'event':'Ryder Cup','name':'Europe','odds':{'numerator':7,'denominator':4}},{'bet_id':6,'event':'Ryder Cup','name':'USA','odds':{'numerator':9,'denominator':2}}];

  beforeEach(function () {

    marketStateServiceMock = jasmine.createSpyObj('marketStateService', ['getAvailableEvents', 'setAvailableEvents', 'setSelectedEvent', 'getSelectedEvent']);
    marketStateServiceMock.getAvailableEvents.and.callFake(function () {
      return availableEvents;
    });
    marketStateServiceMock.setAvailableEvents.and.callFake(function () {
    });
    marketStateServiceMock.getSelectedEvent.and.callFake(function () {
      return availableEvents[0];
    });
    marketStateServiceMock.setSelectedEvent.and.callFake(function (event) {
      return event;
    });

    displayOddsServiceMock = jasmine.createSpyObj('displayOddsService', ['displayOdds']);
    displayOddsServiceMock.displayOdds.and.callFake(function () {
      return '3 to 1';
    });

    addBetServiceMock = jasmine.createSpyObj('addBetService', ['addBet']);
    addBetServiceMock.addBet.and.callFake(function () {
    });

    module('bedefrontendtestApp');

    inject(function ($rootScope, $controller, _$location_, $httpBackend, _fetchAllBetsService_) {
      $scope = $rootScope.$new();
      $location = _$location_;
      httpBackend = $httpBackend;
      fetchAllBetsService = _fetchAllBetsService_;

      ctrl = $controller('MarketCtrl', {
        $scope: $scope,
        $location: $location,
        displayOddsService: displayOddsServiceMock,
        addBetService: addBetServiceMock,
        marketStateService: marketStateServiceMock,
        fetchAllBetsService: _fetchAllBetsService_
      });
    });

    httpBackend.expectGET('https://bedefetechtest.herokuapp.com/v1/markets').respond(fetchedBets);
  });

  it('should call displayOdds', function () {
    var result = $scope.displayOdds({});
    expect(result).toBe('3 to 1');
  });

  it('if events are already saved in the market state service, it should use them', function () {
    expect($scope.availableEvents.length).toEqual(2);
    expect($scope.selectedEvent).toEqual(availableEvents[0]);
  });

  it('if events are already saved in the market state service, but no stored is selection is present select the first one', function () {
    marketStateServiceMock.getSelectedEvent.and.callFake(function () {
      return undefined;
    });

    ctrl.init();

    expect($scope.selectedEvent).toEqual(availableEvents[0]);
  });

  it('if no events are already saved in the market state service, it should get all of the events', function () {
    marketStateServiceMock.getAvailableEvents.and.callFake(function () {
      return [];
    });

    ctrl.init();
    httpBackend.flush();

    var returnedPromise = fetchAllBetsService.fetchAllBets();
    returnedPromise.then(function() {});

    expect($scope.availableEvents).toEqual(availableEvents);
    expect(marketStateServiceMock.setAvailableEvents).toHaveBeenCalledWith(availableEvents);
    expect($scope.selectedEvent).toEqual(availableEvents[0]);
    expect(marketStateServiceMock.setSelectedEvent).toHaveBeenCalledWith(availableEvents[0]);
  });

  it('if no selected event it should select the first one', function () {
    marketStateServiceMock.getSelectedEvent.and.callFake(function () {
      return undefined;
    });
    expect($scope.selectedEvent).toEqual(availableEvents[0]);
  });

  it('should select an event clicked on', function () {
    $scope.eventClicked(availableEvents[1]);
    expect($scope.selectedEvent).toEqual(availableEvents[1]);
    expect(marketStateServiceMock.setSelectedEvent).toHaveBeenCalledWith(availableEvents[1]);
  });

  it('should add a bet', function () {
    $scope.addBet(bets[0]);
    expect(addBetServiceMock.addBet).toHaveBeenCalledWith(bets[0]);

    var result = $location.path();
    expect(result).toEqual('/bettingSlip');
  });

});

describe('market controller tests with no events on the server', function () {
  var displayOddsServiceMock, addBetServiceMock, marketStateServiceMock;
  var fetchAllBetsService;
  var $scope, $location, ctrl, httpBackend;

  var availableEvents = [{
    'event': 'Next World Cup',
    'bets': [{
      'bet_id': 1,
      'event': 'Next World Cup',
      'name': 'England',
      'odds': {'numerator': 10, 'denominator': 1}
    }, {
      'bet_id': 2,
      'event': 'Next World Cup',
      'name': 'Brazil',
      'odds': {'numerator': 2, 'denominator': 1}
    }, {
      'bet_id': 3,
      'event': 'Next World Cup',
      'name': 'Spain',
      'odds': {'numerator': 3, 'denominator': 1}
    }, {'bet_id': 4, 'event': 'Next World Cup', 'name': 'Germany', 'odds': {'numerator': 1, 'denominator': 1}}]
  }, {
    'event': 'Ryder Cup',
    'bets': [{
      'bet_id': 5,
      'event': 'Ryder Cup',
      'name': 'Europe',
      'odds': {'numerator': 7, 'denominator': 4}
    }, {'bet_id': 6, 'event': 'Ryder Cup', 'name': 'USA', 'odds': {'numerator': 9, 'denominator': 2}}]
  }];

  beforeEach(function () {

    marketStateServiceMock = jasmine.createSpyObj('marketStateService', ['getAvailableEvents', 'setAvailableEvents', 'setSelectedEvent', 'getSelectedEvent']);
    marketStateServiceMock.getAvailableEvents.and.callFake(function () {
      return availableEvents;
    });
    marketStateServiceMock.setAvailableEvents.and.callFake(function () {
    });
    marketStateServiceMock.getSelectedEvent.and.callFake(function () {
      return availableEvents[0];
    });
    marketStateServiceMock.setSelectedEvent.and.callFake(function (event) {
      return event;
    });

    displayOddsServiceMock = jasmine.createSpyObj('displayOddsService', ['displayOdds']);
    displayOddsServiceMock.displayOdds.and.callFake(function () {
      return '3 to 1';
    });

    addBetServiceMock = jasmine.createSpyObj('addBetService', ['addBet']);
    addBetServiceMock.addBet.and.callFake(function () {
    });

    displayOddsServiceMock = jasmine.createSpyObj('displayOddsService', ['displayOdds']);
    displayOddsServiceMock.displayOdds.and.callFake(function () {
      return '3 to 1';
    });

    module('bedefrontendtestApp');

    inject(function ($rootScope, $controller, _$location_, $httpBackend, _fetchAllBetsService_) {
      $scope = $rootScope.$new();
      $location = _$location_;
      httpBackend = $httpBackend;
      fetchAllBetsService = _fetchAllBetsService_;

      ctrl = $controller('MarketCtrl', {
        $scope: $scope,
        $location: $location,
        displayOddsService: displayOddsServiceMock,
        addBetService: addBetServiceMock,
        marketStateService: marketStateServiceMock,
        fetchAllBetsService: _fetchAllBetsService_
      });
    });

    httpBackend.expectGET('https://bedefetechtest.herokuapp.com/v1/markets').respond([]);
  });

  it('if no events are already saved in the market state service, and no events are on the server it should set $scope.noBetsFound', function () {
    marketStateServiceMock.getAvailableEvents.and.callFake(function () {
      return [];
    });

    ctrl.init();
    httpBackend.flush();

    var returnedPromise = fetchAllBetsService.fetchAllBets();
    returnedPromise.then(function (response) {
      console.log(response);
      response.data = [];
    });

    expect($scope.noBetsFound).toEqual(true);
  });

});

  describe('market controller tests with no connection', function () {
    var displayOddsServiceMock, addBetServiceMock, marketStateServiceMock;
    var fetchAllBetsService;
    var $scope, $location, ctrl, httpBackend;

    var availableEvents = [{
      'event': 'Next World Cup',
      'bets': [{
        'bet_id': 1,
        'event': 'Next World Cup',
        'name': 'England',
        'odds': {'numerator': 10, 'denominator': 1}
      }, {
        'bet_id': 2,
        'event': 'Next World Cup',
        'name': 'Brazil',
        'odds': {'numerator': 2, 'denominator': 1}
      }, {
        'bet_id': 3,
        'event': 'Next World Cup',
        'name': 'Spain',
        'odds': {'numerator': 3, 'denominator': 1}
      }, {'bet_id': 4, 'event': 'Next World Cup', 'name': 'Germany', 'odds': {'numerator': 1, 'denominator': 1}}]
    }, {
      'event': 'Ryder Cup',
      'bets': [{
        'bet_id': 5,
        'event': 'Ryder Cup',
        'name': 'Europe',
        'odds': {'numerator': 7, 'denominator': 4}
      }, {'bet_id': 6, 'event': 'Ryder Cup', 'name': 'USA', 'odds': {'numerator': 9, 'denominator': 2}}]
    }];

    beforeEach(function () {

      marketStateServiceMock = jasmine.createSpyObj('marketStateService', ['getAvailableEvents', 'setAvailableEvents', 'setSelectedEvent', 'getSelectedEvent']);
      marketStateServiceMock.getAvailableEvents.and.callFake(function () {
        return availableEvents;
      });
      marketStateServiceMock.setAvailableEvents.and.callFake(function () {
      });
      marketStateServiceMock.getSelectedEvent.and.callFake(function () {
        return availableEvents[0];
      });
      marketStateServiceMock.setSelectedEvent.and.callFake(function (event) {
        return event;
      });

      displayOddsServiceMock = jasmine.createSpyObj('displayOddsService', ['displayOdds']);
      displayOddsServiceMock.displayOdds.and.callFake(function () {
        return '3 to 1';
      });

      addBetServiceMock = jasmine.createSpyObj('addBetService', ['addBet']);
      addBetServiceMock.addBet.and.callFake(function () {
      });

      displayOddsServiceMock = jasmine.createSpyObj('displayOddsService', ['displayOdds']);
      displayOddsServiceMock.displayOdds.and.callFake(function () {
        return '3 to 1';
      });

      module('bedefrontendtestApp');

      inject(function ($rootScope, $controller, _$location_, $httpBackend, _fetchAllBetsService_) {
        $scope = $rootScope.$new();
        $location = _$location_;
        httpBackend = $httpBackend;
        fetchAllBetsService = _fetchAllBetsService_;

        ctrl = $controller('MarketCtrl', {
          $scope: $scope,
          $location: $location,
          displayOddsService: displayOddsServiceMock,
          addBetService: addBetServiceMock,
          marketStateService: marketStateServiceMock,
          fetchAllBetsService: _fetchAllBetsService_
        });
      });

      httpBackend.when('GET', 'https://bedefetechtest.herokuapp.com/v1/markets').respond(404, '');
    });

    it('if no connection $scope.noConnection should be set', function () {
      marketStateServiceMock.getAvailableEvents.and.callFake(function () {
        return [];
      });

      ctrl.init();
      httpBackend.flush();

      var returnedPromise = fetchAllBetsService.fetchAllBets();
      returnedPromise.then(function () {
      });

      expect($scope.noConnection).toEqual(true);
    });
  });
