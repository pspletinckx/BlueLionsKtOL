'use strict';

/**
 * @ngdoc function
 * @name statelessScoreboardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the statelessScoreboardApp
 */
angular.module('statelessScoreboardApp')
  .controller('MainCtrl', function ($scope,$http,$interval) {
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

    $scope.killspam = [];

    $scope.getKillSpam = function(){
        return $scope.killspam;
    };
    $scope.resolvePlayer = function(playerid){
        return $scope.lookuptable;
        //return promise
    }
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

    $scope.lookuptable = new Map ([
        [5428010618035982689,"Bullet0Storm"]
        ]);

    var buildPlayersIndex = function(){
        $http.jsonp('https://census.daybreakgames.com/s:BlueLegacy/get/ps2:v2/outfit/?outfit_id=37509488620601556&c:resolve=member_character%28name%29&callback=JSON_CALLBACK')
        .success(function(data){
            var members = data.outfit_list[0].members;
        console.log(members.length+" Members returned");

        for (var i = members.length - 1; i >= 0; i--) {
            var member = members[i];
            if (member.name != null){
            //console.log(member.character_id +" "+member.name.first);
            $scope.lookuptable.set(member.character_id, member.name.first);
            };
        };
        
    });
    };

    

    var getIdNumbers = function(){};
    //http://census.daybreakgames.com/get/ps2:v2/character/?name.first=Bullet0Storm&c:show=name,faction_id,battle_rank,characterid
    var updateTeamA = function(){};

    var timesExecuted = 0;

    var getStatelessData = function(){
        timesExecuted ++;
        console.log(timesExecuted);
    	//http://census.daybreakgames.com/get/ps2:v2/characters_event/?character_id=5428010618020694593&c:limit=10&type=DEATH
    	$http.jsonp('http://census.daybreakgames.com/s:BlueLegacy/get/ps2:v2/characters_event/?character_id=5428010618035982689&c:limit=10&type=DEATH&callback=JSON_CALLBACK')
    	.success(function(data){
            var events = data.characters_event_list;
            for (var i = data.characters_event_list.length - 1; i >= 0; i--) {
                $scope.killspam.push(
                    {
                        time:events[i].timestamp,
                        killer:events[i].attacker_character_id,
                        target:events[i].character_id,
                        weapon:events[i].attacker_weapon_id

                    });
                //console.log(events[i]);
            };
    	//console.log(data);
    	
    });

    	//get Data with id later then match time

    	//filter data with list of contestents

    	//push data to killspam
    };

    buildPlayersIndex();
    getStatelessData();


    
    $interval(function(){
        console.log("Going for new loop");
        //getStatelessData();
    }
    ,10000);
    
   


});

