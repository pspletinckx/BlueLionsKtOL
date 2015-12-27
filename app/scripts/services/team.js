'use strict';

/**
 * @ngdoc service
 * @name statelessScoreboardApp.Team
 * @description
 * # Team
 * Factory in the statelessScoreboardApp.
 */
angular.module('statelessScoreboardApp')
  .factory('Team', function () {
   
   function Team (){
    this.outfits = [];
    this.singles = [];
   }

   Team.prototype.getCharacters = function(){
      var allCharacters=[];
      if(n=='a') var i = 0;
      if(n=='b') var i = 1;

      for (var j = Team.outfits.length - 1; j >= 0; j--) {
        allCharacters.push.apply(allCharacters,team.outfits[j].members);
      };
      allCharacters.push.apply(allCharacters,Team.singles);
      return allCharacters;
    }

   return Team;
  });
