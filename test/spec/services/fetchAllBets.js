'use strict';

describe('fetchBets tests', function (){
  var fetchAllBetsService;
  var httpBackend;

  beforeEach(function () {

    // load the module.
    module('bedefrontendtestApp');

    inject(function($httpBackend, _fetchAllBetsService_) {
      fetchAllBetsService = _fetchAllBetsService_;
      httpBackend = $httpBackend;
    });
  });

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should have an fetchAllBets function', function () {
    expect(angular.isFunction(fetchAllBetsService.fetchAllBets)).toBe(true);
  });


  it('should fetch all the bets', function (){
    var returnData = [{'bet_id': 1, 'event': 'next world cup', 'name': 'Brazil', 'odds': {'numerator': 3, 'denominator': 1}},
                      {'bet_id': 2, 'event': 'next world cup', 'name': 'Spain', 'odds': {'numerator': 4, 'denominator': 1}}];

    httpBackend.expectGET('https://bedefetechtest.herokuapp.com/v1/markets').respond(returnData);

    var returnedPromise = fetchAllBetsService.fetchAllBets();

    var result;
    returnedPromise.then(function(response) {
      result = response;
    });

    httpBackend.flush();

    expect(result.data).toEqual(returnData);
  });
});
