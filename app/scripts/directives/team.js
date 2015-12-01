'use strict';

/**
 * @ngdoc directive
 * @name statelessScoreboardApp.directive:team
 * @description
 * # team
 */
angular.module('statelessScoreboardApp')
  .directive('team', function () {
    return {
      templateUrl: 'templates/team.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        
      }
    };
  });
