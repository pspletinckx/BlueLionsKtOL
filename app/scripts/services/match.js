'use strict';

/**
 * @ngdoc service
 * @name statelessScoreboardApp.Match
 * @description
 * # Match
 * Factory in the statelessScoreboardApp.
 */
angular.module('statelessScoreboardApp')
  .factory('Match',['Team', function (Team) {
    

    // function Match(){
    //   this.players = {
    //     team:[{//team could be an object
    //       outfits:[],
    //       singles:[]
    //     },
    //     {
    //       outfits:[],
    //       singles:[]
    //     }]};
    // }

    function Match(){
      this.players = {
        team:[
        new Team(),
        new Team()
        ]
      }
    }

    function Match(teamA,teamB){
      this.players = {
        team : [teamA, teamB]
      };
    }



    // $scope.match = {
    //   players:{
    //     team:[{
    //       outfits:[],
    //       singles:[]
    //     },
    //     {
    //       outfits:[],
    //       singles:[]
    //     }]
    //   },
    //   matchMeta:{}
    // };

    // Public API here


        return Match;
 
  }]);
