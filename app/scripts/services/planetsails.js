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
      loadout: $resource("http://sails-pspletinckx.rhcloud.com/loadout/:id",{},{}),
      match: $resource("http://sails-pspletinckx.rhcloud.com/match/:id",{},{})
    };
  }]);
