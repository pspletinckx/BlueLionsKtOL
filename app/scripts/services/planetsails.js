'use strict';

/**
 * @ngdoc service
 * @name statelessScoreboardApp.planetsails
 * @description
 * # planetsails
 * Factory in the statelessScoreboardApp.
 */
angular.module('statelessScoreboardApp')
  .factory('planetsails',['$resource', function ($resource) {
        return{
      loadout: $resource("http://localhost:1337/loadout/:id",{},{}),
      match: $resource("http://localhost:1337/match/:id",{},{})
    };
  }]);
