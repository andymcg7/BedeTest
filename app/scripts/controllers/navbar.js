'use strict';

/**
 * @ngdoc function
 * @name bedefrontendtestApp.controller:NavBarCtrl
 * @description
 * # NavBarCtrl
 * Simple controller for the navbar, returns if a location is active or not
 */
angular.module('bedefrontendtestApp')
  .controller('NavBarCtrl', function ($scope, $location) {

    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };

  });
