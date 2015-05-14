'use strict';

/**
 * @ngdoc function
 * @name statelessScoreboardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the statelessScoreboardApp
 */
angular.module('statelessScoreboardApp')
  .controller('MainCtrl', function ($scope,$http) {
  	///presentation
    $scope.matchStatusEN = [
      'Ready to start',
      'Ongoing',
      'Finished'
    ];
    $scope.teamNameA = 'Generals';
    $scope.teamNameB = 'Lions';
    $scope.matchStatus  = 'Ready to start';
    $scope.gameMode = 'Adversial - Time';
    $scope.gameModeRules ='Killing a member of the opposing team earns you a ticket to victory. Team with most tickets after the match wins';
    
    //logic

    $scope.getTotal = function(stat){ //totals compiler
    	var total = 0;
    	switch(stat){
    		case "killsA":
    		{for(var i = 0; i < $scope.teamA.length; i++){
	        var player = $scope.teamA[i];
	        total += player.kills;}}
	        break;
	        case "killsB":
    		{for(var i = 0; i < $scope.teamB.length; i++){
	        var player = $scope.teamB[i];
	        total += player.kills;}}
	        break;
	        case "deathsA":
    		{for(var i = 0; i < $scope.teamA.length; i++){
	        var player = $scope.teamA[i];
	        total += player.deaths;}}
	        break;
	        case "deathsB":
    		{for(var i = 0; i < $scope.teamB.length; i++){
	        var player = $scope.teamB[i];
	        total += player.deaths;}}
	        break;
    	}
    return total;
    };

    $scope.killspam = [ //filtered body pile
    {
    	time:'00:00',
    	killer:'Killer',
    	target:'Killee',
    	weapon:'Battleaxe'
    },
    {
    	time:'00:00',
    	killer:'Killer',
    	target:'Killee',
    	weapon:'Battleaxe'
    }];

    $scope.teamA = [ //representational scoreboard
    {
    	name: 'Bullet0Storm',
		id: 'number',
		kills: 5,
		deaths: 6	
	},
	{
    	name: 'Bullet0Storm',
		id: 'number',
		kills: 4,
		deaths: 6	
	},
	{
    	name: 'Bullet0Storm',
		id: 'number',
		kills: 3,
		deaths: 6	
	},
	{
    	name: 'Bullet0Storm',
		id: 'number',
		kills: 1,
		deaths: 6	
	}];

	$scope.teamB = [
    {
    	name: 'Bullet0Storm',
		id: 'number',
		kills: 4,
		deaths: 6	
	},
	{
    	name: 'Bullet0Storm',
		id: 'number',
		kills: 4,
		deaths: 6	
	},
	{
    	name: 'Bullet0Storm',
		id: 'number',
		kills: 4,
		deaths: 6	
	},
	{
    	name: 'Bullet0Storm',
		id: 'number',
		kills: 4,
		deaths: 6	
	}];

    var getIdNumbers = function(){};
    //http://census.daybreakgames.com/get/ps2:v2/character/?name.first=Bullet0Storm&c:show=name,faction_id,battle_rank,characterid
    var updateTeamA = function(){};

    var getStatelessData = function(characterid){
    	//http://census.daybreakgames.com/get/ps2:v2/characters_event/?character_id=5428010618020694593&c:limit=10&type=DEATH
    	$http.jsonp('http://census.daybreakgames.com/get/ps2:v2/characters_event/?character_id=5428010618035982689&c:limit=10&type=DEATH&callback=JSON_CALLBACK')
    	.success(function(data){
    	console.log(data);
    	
    });

    	//get Data with id later then match time

    	//filter data with list of contestents

    	//push data to killspam
    };
    setInterval(getStatelessData("Bullet0Storm"),10000);



});

