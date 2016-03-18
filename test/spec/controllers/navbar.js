'use strict';


describe('Testing the navbar', function() {
  var $scope, ctrl;
  var locationServiceMock;

  beforeEach(function () {

    locationServiceMock = jasmine.createSpyObj('$location', ['path']);

    // load the module you're testing.
    module('bedefrontendtestApp');

    inject(function ($rootScope, $controller) {
      $scope = $rootScope.$new();

      ctrl = $controller('NavBarCtrl', {
        $scope: $scope,
        $location: locationServiceMock
      });
    });
  });

  it('should have an isActive function', function () {
    expect(angular.isFunction($scope.isActive)).toBe(true);
  });

  it('should be able to check the current location', function () {
    locationServiceMock.path.and.callFake(function() {
      return 'test';
    });

    var result = $scope.isActive('test');
    expect(result).toBe(true);
  });




});
