'use strict';

/**
 * @ngdoc service
 * @name statelessScoreboardApp.Match
 * @description
 * # Match
 * Factory in the statelessScoreboardApp.
 */
angular.module('statelessScoreboardApp')
  .factory('Match', function () {
    

    function Match(){
      this.players = {
        team:[{//team could be an object
          outfits:[],
          singles:[]
        },
        {
          outfits:[],
          singles:[]
        }]};
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
 
  });
