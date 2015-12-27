'use strict';

/**
 * @ngdoc function
 * @name statelessScoreboardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the statelessScoreboardApp
 */
angular.module('statelessScoreboardApp')
  .controller('MainCtrl', function ($scope,$http,$interval, $filter,daybreakOutfits, planetsails) {
  	///presentation
    $scope.allMatches = [];
    $scope.allMatches= planetsails.match.query({"limit":5},function(){
        selectMatch(0);
        $scope.update27dec();
    });
    $scope.thisMatch = $scope.allMatches[0];
    $scope.selectedMatch;


    $scope.selectMatch = function(integer){
        $scope.selectedMatch = $scope.allMatches[integer];
        addKd();
        $scope.update27dec();
    }

    var selectMatch = function(integer){
        $scope.selectedMatch = $scope.allMatches[integer];
        addKd();
        $scope.update27dec();
    }

    $scope.getCharacters = function(n){
        if (!$scope.selectedMatch) return [];
      var allCharacters=[];
      if(n=='a') var i = 0;
      if(n=='b') var i = 1;
      var team = $scope.selectedMatch.players.team[i];

      for (var j = team.outfits.length - 1; j >= 0; j--) {
        allCharacters.push.apply(allCharacters,team.outfits[j].members);
      };
      allCharacters.push.apply(allCharacters,team.singles);
      return allCharacters;
    }

    var getStrength=function(n){
      return $scope.getCharacters(n).length;
    }
    $scope.getStrength = getStrength;

    var addKd = function(){
        var addFields = function (chars){
            for (var i = chars.length - 1; i >= 0; i--) {
                chars[i].deaths = 0;
                chars[i].kills= 0;
            };
        }
        var Achars = $scope.getCharacters('a');
        var Bchars = $scope.getCharacters('b');
        addFields(Achars);
        addFields(Bchars);
    }

    //init
    $scope.init =function(){
        $scope.selectedMatch(0);
        $scope.addKd();
    };

    $scope.update27dec = function(){
            var scores;
            var playerIdString="";
            var playerids;
        if(getStrength('a') <= getStrength('b')){
            playerids = $scope.getCharacters('a');  }
        else {
            playerids = $scope.getCharacters('b');  }
        for (var i = playerids.length - 1; i >= 0; i--) {
                if(!playerids[i].character_id) return;
                playerIdString += playerids[i].character_id;
                if(i!=0) playerIdString += ",";
            };
                console.log("connectionstring : "+ playerIdString);
            daybreakOutfits.killspam(playerIdString).then(
                function(data){
                        console.log(data);
                });
    }

    //OLD IMPLEMENTATION


    $scope.matchStatusEN = [
      'Ready to start',
      'Ongoing',
      'Finished'
    ];
    var buildingLookuptable = {
        lionsDone: false,
        generalsvs: false,
        generalstr: false
    }

    $scope.teamNameA = "Generals";
    $scope.teamNameB = "Lions";
    $scope.matchStatus  = "Ready to start";
    $scope.gameMode = "Adversial - Time";
    $scope.gameModeRules ="Killing a member of the opposing team earns you a ticket to victory. Team with most tickets after the match wins";
    
    $scope.match = {
        start : 1433116800
    };

    $scope.GeneralsTR = [];
    $scope.GeneralsVS = [];
    $scope.Lions = [];

    $scope.GeneralsFilter="";

    $scope.ScoreGenerals=0;
    $scope.ScoreLions=0;

    //logic for team totals

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
    $scope.filtered = [];

    $scope.getKillSpam = function(){
        return $scope.killspam;
    };
    $scope.resolvePlayer = function(playerid){
        return $scope.lookuptable;
        //return promise
    };
    $scope.getLions=function(){
        return $scope.Lions;
    };

    $scope.teamA = [ //representational scoreboard
    {
    	name: 'Bullet0Storm',
		id: 'number',
		kills: 5,
		deaths: 6	
	}];

	$scope.teamB = [
    {
    	name: 'Bullet0Storm',
		id: 'number',
		kills: 4,
		deaths: 6	
	}];

    //lookup index

    $scope.lookuptable = new Map ([
        [5428010618035982689,"Bullet0Storm"]
    ]);
    // For add directive
    var addBlueLions = function(){
        $http.jsonp('https://census.daybreakgames.com/s:BlueLegacy/get/ps2:v2/outfit/?outfit_id=37509488620601556&c:resolve=member_character%28name%29&callback=JSON_CALLBACK')
        .success(function(data){
            var members = data.outfit_list[0].members;
        // console.log(members.length+" Members returned");

        for (var i = members.length - 1; i >= 0; i--) {
            var member = members[i];
            if (member.name != null){
            //console.log(member.character_id +" "+member.name.first);
            $scope.lookuptable.set(member.character_id, member.name.first);
                $scope.Lions.push(
                {
                    name: member.name.first,
                    id: member.character_id,
                    kills: 0,
                    deaths: 0   
                });
            };
        };
        buildingLookuptable.lionsDone = true;
        everthingDone();
    });
    };
    var addGeneralsTR = function(){
        $http.jsonp('https://census.daybreakgames.com/s:BlueLegacy/get/ps2:v2/outfit/?outfit_id=37525841087037762&c:resolve=member_character%28name%29&callback=JSON_CALLBACK')
        .success(function(data){
            var members = data.outfit_list[0].members;
        // console.log(members.length+" Members returned");

        for (var i = members.length - 1; i >= 0; i--) {
            var member = members[i];
            if (member.name != null){
            //console.log(member.character_id +" "+member.name.first);
            $scope.lookuptable.set(member.character_id, member.name.first);
            $scope.GeneralsFilter = $scope.GeneralsFilter+member.character_id+",";
            // console.log($scope.GeneralsFilter);

                $scope.GeneralsTR.push(
                {
                    name: member.name.first,
                    id: member.character_id,
                    kills: 0,
                    deaths: 0   
                });
            };
        };
        buildingLookuptable.generalstr = true;
        everthingDone();
    });
    };

    var addGeneralsVS = function(){
        daybreakOutfits.outfitMembers("ABL")
        .success(function(data){
            var members = data.outfit_list[0].members;
        // console.log(members.length+" Members returned");

        for (var i = members.length - 1; i >= 0; i--) {
            var member = members[i];
            if (member.name != null){
            //console.log(member.character_id +" "+member.name.first);
            $scope.lookuptable.set(member.character_id, member.name.first);
            $scope.GeneralsFilter = $scope.GeneralsFilter+member.character_id+",";

            // console.log($scope.GeneralsFilter);
                $scope.GeneralsVS.push(
                {
                    name: member.name.first,
                    id: member.character_id,
                    kills: 0,
                    deaths: 0   
                });
            };
        };
        buildingLookuptable.generalsvs = true;
        everthingDone();
    });
    };

    //scoreboard player filter
    $scope.onlyRelevant = function(value, index, array){
                 if ( $scope.lookuptable.has(value.killer)&&$scope.lookuptable.has(value.target)){
                return true;
        }
        else return false;
    }
    // lookup index

    var addOutfitToIndex = function(){
        $http.jsonp('https://census.daybreakgames.com/s:BlueLegacy/get/ps2:v2/outfit/?outfit_id=37509488620601556&c:resolve=member_character%28name%29&callback=JSON_CALLBACK')
        .success(function(data){
            var members = data.outfit_list[0].members;
        //console.log(members.length+" Members returned");

        for (var i = members.length - 1; i >= 0; i--) {
            var member = members[i];
            if (member.name != null){
            //console.log(member.character_id +" "+member.name.first);
            $scope.lookuptable.set(member.character_id, member.name.first);
            };
        };
    });
    };

    var timesExecuted = 0;
    //required variables: killspam, playerids, lookuptable
    //this downloads the killspam
    //also calculates overall score
    var lock = false;
    var getScoreData = function(playerids){
        if (lock) return;
        lock=true;
        timesExecuted ++;
        //console.log(timesExecuted);
        var timestamp = 1433116800; //event time
        var killspam =$scope.killspam
        if(killspam.length >0){
            timestamp = $scope.killspam[$scope.killspam.length-1].time; //only get new events
        }
        //var playerids = "5428010618035982689,5428163811558091905,5428147970869687073"; //Bullet0Storm, Gr1mJ4w, RB21
        //http://census.daybreakgames.com/get/ps2:v2/characters_event/?character_id=5428010618020694593&c:limit=10&type=DEATH
        $http.jsonp('http://census.daybreakgames.com/s:BlueLegacy/get/ps2:v2/characters_event/?character_id='+playerids+'&c:limit=1000&type=DEATH,KILL&after='+timestamp+'&callback=JSON_CALLBACK')
        .success(function(data){
            console.log("response is here");
            var events = data.characters_event_list;
            for (var i = data.characters_event_list.length - 1; i >= 0; i--) {
                $scope.killspam.push(
                    {
                        time:events[i].timestamp,
                        killer:events[i].attacker_character_id,
                        target:events[i].character_id,
                        weapon:events[i].attacker_weapon_id
                    });
                if(($scope.lookuptable.get(events[i].attacker_character_id)!=null)&&($scope.lookuptable.get(events[i].character_id))!=null){
                    if(events[i].table_type=="kills") $scope.ScoreGenerals +=1;
                    if(events[i].table_type=="deaths") $scope.ScoreLions ++;
                };
                
            };
            //console.log(data.returned+" records returned");
            UpdateScoreboard();
            lock = false;
        });
    };
    //this pushes data from the killspam to the scoreboard
    //required variables: killspam, lookuptable
    var timestamp=0;
    var UpdateScoreboard = function(){
        //reset increment values to 0
        for (var l = $scope.Lions.length - 1; l >= 0; l--) {
                    $scope.Lions[l].kills =0;
                    $scope.Lions[l].deaths =0;
                };
        for (var l = $scope.GeneralsTR.length - 1; l >= 0; l--) {
                    $scope.GeneralsTR[l].kills =0;
                    $scope.GeneralsTR[l].deaths =0;
                };
        for (var l = $scope.GeneralsVS.length - 1; l >= 0; l--) {
                    $scope.GeneralsVS[l].kills =0;
                    $scope.GeneralsVS[l].deaths =0;
                };
        //for all killspam entries
        for (var i = $scope.killspam.length - 1; i >= 0; i--) {
                var matchKiller=$scope.killspam[i].killer;
                var matchTarget=$scope.killspam[i].target;
        //do count if relevant
            if(($scope.lookuptable.get(matchKiller)!=null)&&($scope.lookuptable.get(matchTarget))!=null){

                for (var l = $scope.Lions.length - 1; l >= 0; l--) {
                    if($scope.Lions[l].id == matchKiller) $scope.Lions[l].kills ++;
                    if($scope.Lions[l].id == matchTarget) $scope.Lions[l].deaths ++;
                };

                for (var l = $scope.GeneralsTR.length - 1; l >= 0; l--) {
                    if($scope.GeneralsTR[l].id == matchKiller) $scope.GeneralsTR[l].kills ++;
                    if($scope.GeneralsTR[l].id == matchTarget) $scope.GeneralsTR[l].deaths ++;
                };
                for (var l = $scope.GeneralsVS.length - 1; l >= 0; l--) {
                    if($scope.GeneralsVS[l].id == matchKiller) $scope.GeneralsVS[l].kills ++;
                    if($scope.GeneralsVS[l].id == matchTarget) $scope.GeneralsVS[l].deaths ++;
                };
            };

        };
    };
    $scope.playerMatters = function(player){
        return (player.kills>0||player.deaths>0);
    };

    // $scope.clockTime = new Date();
    // $scope.getGameClock = function (){
    //     return $scope.clockTime;
    // };
    
    // $scope.updateClock = function(){
    //     $scope.clockTime = new Date();
    //     $interval(function(){
    //         $scope.updateClock();
    //     }
    //         ,1000);
    // };
    //$scope.updateClock();

    //addOutfitToIndex();
    //getStatelessData();
    //getScoreData();
    addBlueLions();
    addGeneralsTR();
    addGeneralsVS();
    UpdateScoreboard();

    var everthingDone = function(){
        if (buildingLookuptable.lionsDone&& buildingLookuptable.generalsvs && buildingLookuptable.generalstr){
            getScoreData($scope.GeneralsFilter);
        }
    }

    // $interval(function(){
    //     console.log("Going for new loop "+ new Date());
    //     getScoreData($scope.GeneralsFilter);
    // }
    // ,5000);
});

