'use strict';

/**
 * @ngdoc function
 * @name statelessScoreboardApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the statelessScoreboardApp
 */
angular.module('statelessScoreboardApp')
  .controller('AboutCtrl', function ($scope,$http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var controller = this;


    $http.jsonp('http://census.daybreakgames.com/get/ps2:v2/character/?name.first=Bullet0Storm&c:show=name,faction_id,battle_rank,character_id&callback=JSON_CALLBACK')
    .success(function(data){
    	console.log(data);
    	$scope.bullet=data.character_list[0];
    });

  });
