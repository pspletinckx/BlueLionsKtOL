'use strict';

/**
 * @ngdoc service
 * @name statelessScoreboardApp.Team
 * @description
 * # Team
 * Factory in the statelessScoreboardApp.
 */
angular.module('statelessScoreboardApp')
  .factory('Team',['daybreakOutfits' ,function (daybreakOutfits) {
   
   function Team (){
    this.outfits = [];
    this.singles = [];
   }

   Team.prototype.getCharacters = function(){
      var allCharacters=[];

      for (var j = Team.outfits.length - 1; j >= 0; j--) {
        allCharacters.push.apply(allCharacters,Team.outfits[j].members);
      };
      allCharacters.push.apply(allCharacters,Team.singles);
      return allCharacters;
    }

   Team.prototype.addPlayer = function(fullName){
      daybreakOutfits.character(fullName).then(
        function(resp){
            Team.singles.push(resp.data.character_list[0]);
            done();
        });
    }

  Team.prototype.addOutfit = function(tag){
      //look for specs on the outfit
      daybreakOutfits.outfitMembers(tag).then(
        function(resp){
            Team.outfits.push(resp.data.outfit_list[0]);
        });

    }

    Team.prototype.teamsLookupTable = function(){
    var charsA = this.getCharacters();
    for (var i = charsA.length - 1; i >= 0; i--) {
        var member = charsA[i];
        if (member.name!=null){
            $scope.lookuptableTeamA.set(member.character_id, member.name.first);
        }
    };     
  }











   return Team;
  }]);
