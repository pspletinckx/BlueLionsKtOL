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
        },
        character : function (fullName){
          var fullNameLower = fullName.toLowerCase();
          return $http({
            method: "JSONP",
            url: 'http://census.daybreakgames.com/s:BlueLegacy/get/ps2:v2/character/?name.first_lower='+fullNameLower+'&callback=JSON_CALLBACK'
          });
        },
        killspam : function(playerids, timestamp){
          if (!timestamp) timestamp  = "1433116800";
          return $http({
            method : "JSONP",
            url : 'http://census.daybreakgames.com/s:BlueLegacy/get/ps2:v2/characters_event/?character_id='+playerids+'&c:limit=1000&type=DEATH,KILL&after='+timestamp+'&callback=JSON_CALLBACK'
          })
        }
      }
  });
