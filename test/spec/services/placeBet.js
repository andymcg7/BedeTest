'use strict';

describe('placeBet tests', function (){
  var placeBetService, httpBackend;

  beforeEach(function () {

    // load the module.
    module('bedefrontendtestApp');

    inject(function($httpBackend, _placeBetService_) {
      placeBetService = _placeBetService_;
      httpBackend = $httpBackend;
    });
  });

  // make sure no expectations were missed in your tests.
  // (e.g. expectGET or expectPOST)
  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should have an placeBet function', function () {
    expect(angular.isFunction(placeBetService.placeBet)).toBe(true);
  });


  it('should return a 201 if the request is valid, or 400 if invalid', function (){
    // set up some data for the http call to return and test later.
    var bet = {'event': 'next world cup', 'name': 'Brazil', 'odds': {'numerator': 3, 'denominator': 1}};

    httpBackend.when('POST', 'https://bedefetechtest.herokuapp.com/v1/bets',
      function(postData) {
        var jsonData = JSON.parse(postData);
        expect(jsonData.bet_id).toBe(bet.bet_id);
        expect(jsonData.stake).toBe(bet.stake);
        expect(jsonData.odds.numerator).toBe(bet.odds.numerator);
        expect(jsonData.odds.denominator).toBe(bet.odds.denominator);
        return true;
      }
    ).respond(201, true );

    placeBetService.placeBet(bet).then(function(response) {
      expect(response).toBeTruthy();
    });

    httpBackend.flush();
  });

});
