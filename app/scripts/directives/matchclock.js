'use strict';

/**
 * @ngdoc directive
 * @name statelessScoreboardApp.directive:matchClock
 * @description
 * # matchClock
 */
angular.module('statelessScoreboardApp')
  .directive('matchClock', function () {
    return {
      templateUrl: 'templates/matchClock.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
