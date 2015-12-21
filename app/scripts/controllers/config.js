'use strict';

/**
 * @ngdoc function
 * @name statelessScoreboardApp.controller:ConfigCtrl
 * @description
 * # ConfigCtrl
 * Controller of the statelessScoreboardApp
 */
angular.module('statelessScoreboardApp')
  .controller('ConfigCtrl',['$scope','daybreakOutfits', function ($scope,daybreakOutfits) {

  	//visible players on team A
  	$scope.a = [];
  	//visiable players on team B
  	$scope.b = [];
  	//characters per team
    $scope.aMembers = [{name:{first:"dummy"}}];
    //
    $scope.bMembers = []; 

    //put this in a provider
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


    //
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

  		//add outfit to team n

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
      // if(n=='a') var j = 0;
      // if(n=='b') var j = 1;
      // var count=0;
      // var team = $scope.match.players.team[j];
      // for (var i = team.outfits.length - 1; i >= 0; i--) {
      //   count += team.outfits[i].members.count();
      // };
      // count +=team.singles.count();
      return $scope.getCharacters(n).length;
    }
  }]);
