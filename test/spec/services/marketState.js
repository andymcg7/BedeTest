'use strict';

describe('marketStateService tests', function (){
  var marketStateService;

  var events = [{'bet_id': 1, 'event': 'next world cup', 'name': 'Brazil', 'odds': {'numerator': 3, 'denominator': 1}},
              {'bet_id': 2, 'event': 'next world cup', 'name': 'Spain', 'odds': {'numerator': 4, 'denominator': 1}}];

  beforeEach(function () {

    // load the module.
    module('bedefrontendtestApp');

    inject(function(_marketStateService_) {
      marketStateService = _marketStateService_;
    });
  });

  it('should have an getAvailableEvents function', function () {
    expect(angular.isFunction(marketStateService.getAvailableEvents)).toBe(true);
  });

  it('should have an setAvailableEvents function', function () {
    expect(angular.isFunction(marketStateService.setAvailableEvents)).toBe(true);
  });

  it('should have an getSelectedEvent function', function () {
    expect(angular.isFunction(marketStateService.getSelectedEvent)).toBe(true);
  });

  it('should have an setSelectedEvent function', function () {
    expect(angular.isFunction(marketStateService.setSelectedEvent)).toBe(true);
  });

  it('should set available events', function () {
    marketStateService.setAvailableEvents(events);
    var result = marketStateService.getAvailableEvents();
    expect(result).toBe(events);
  });

  it('should set the selected event', function () {
    marketStateService.setSelectedEvent('next world cup');
    var result = marketStateService.getSelectedEvent();
    expect(result).toBe('next world cup');
  });




});
