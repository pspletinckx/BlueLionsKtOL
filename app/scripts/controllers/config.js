'use strict';

/**
 * @ngdoc function
 * @name statelessScoreboardApp.controller:ConfigCtrl
 * @description
 * # ConfigCtrl
 * Controller of the statelessScoreboardApp
 */
angular.module('statelessScoreboardApp')
  .controller('ConfigCtrl',['$scope','daybreakOutfits','planetsails', function ($scope,daybreakOutfits,planetsails) {
 
    $scope.allMatches = [];

    //put this in a provider
    $scope.statusMessage ="";
    $scope.match = {
      players:{
        team:[{
          outfits:[],
          singles:[]
        },
        {
          outfits:[],
          singles:[]
        }]
      },
      matchMeta:{}
    };
    //adds current match to list
    $scope.addMatchToList = function(){
      //$scope.allMatches.push($scope.match);
      var matchSails = new planetsails.match();
      matchSails.players = $scope.match.players;
      matchSails.$save().then(function(){
        $scope.getAllMatches();
      });
      $scope.reset();
    }
    $scope.getAllMatches = function(){
        $scope.allMatches= planetsails.match.query({"limit":500});
    }
    
  	$scope.addOutfit = function(n,tag){
  		//look for specs on the outfit
  		daybreakOutfits.outfitMembers(tag).then(
  			function(resp){
  				if(n=='a'){
            $scope.match.players.team[0].outfits.push(resp.data.outfit_list[0]);
  				}
  				if(n=='b'){
  					$scope.match.players.team[1].outfits.push(resp.data.outfit_list[0]);
  				}
  			});

  	}

  	$scope.addPlayer = function(n,fullName){
      daybreakOutfits.character(fullName).then(
        function(resp){
          if(n=='a'){
            $scope.match.players.team[0].singles.push(resp.data.character_list[0]);
          }
          if(n=='b'){
            $scope.match.players.team[1].singles.push(resp.data.character_list[0]);
          }
        });
  	}

    $scope.getCharacters = function(n){
      var allCharacters=[];
      if(n=='a') var i = 0;
      if(n=='b') var i = 1;
      var team = $scope.match.players.team[i];

      for (var j = team.outfits.length - 1; j >= 0; j--) {
        allCharacters.push.apply(allCharacters,team.outfits[j].members);
      };
      allCharacters.push.apply(allCharacters,team.singles);
      return allCharacters;
    }
    $scope.getOutfits = function(n){
      if(n=='a') var i = 0;
      if(n=='b') var i = 1;
      return $scope.match.players.team[i].outfits;
    }
    $scope.getStrength=function(n){
      return $scope.getCharacters(n).length;
    }
    $scope.reset=function(){
      $scope.match = {
        players:{
          team:[{
            outfits:[],
            singles:[]
          },
          {
            outfits:[],
            singles:[]
          }]
        },
        matchMeta:{}
      }
    }

    $scope.getAllMatches();
  }]);
