'use strict';

/**
 * @ngdoc function
 * @name statelessScoreboardApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the statelessScoreboardApp
 */
angular.module('statelessScoreboardApp')
  .controller('AboutCtrl', ['$scope','$http', 'daybreakItems', function ($scope,$http, daybreakItems) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var controller = this;

    $scope.weaponId = 1044;
      daybreakItems.itemName($scope.weaponId)
      .success(function(data){
        $scope.weaponName=data.item_list[0].name.en;
      });


      console.log(daybreakItems.itemName($scope.weaponId));


    $http.jsonp('http://census.daybreakgames.com/get/ps2:v2/character/?name.first=Bullet0Storm&c:show=name,faction_id,battle_rank,character_id&callback=JSON_CALLBACK')
    .success(function(data){
    	console.log(data);
    	$scope.bullet=data.character_list[0];


    });

  }]);
