'use strict';

/**
 * @ngdoc service
 * @name statelessScoreboardApp.daybreakOutfits
 * @description
 * # daybreakOutfits
 * Factory in the statelessScoreboardApp.
 */
angular.module('statelessScoreboardApp')
  .factory('daybreakOutfits', function ($http) {
      return {
        outfitMembers : function(tag){
          return $http({
            method: "GET",
            url: 'https://census.daybreakgames.com/s:BlueLegacy/get/ps2:v2/outfit/?alias='+tag+'&c:resolve=member_character%28name%29'
          });
        }
      }
  });
