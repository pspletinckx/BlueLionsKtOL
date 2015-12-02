'use strict';

/**
 * @ngdoc directive
 * @name statelessScoreboardApp.directive:team
 * @description
 * # team
 */
 angular.module('statelessScoreboardApp')
 .directive('team', function () {
 	return{
 		templateUrl: 'templates/team.html',
 		restrict: 'AE',
 		link: function postLink(scope, element, attrs) {

 		},
 		controller: ['$scope','daybreakOutfits', function($scope,daybreakOutfits){
 			$scope.memberlist= [];
 			$scope.teamName = $scope.outfit+" (Team "+$scope.side+")";

 			daybreakOutfits.outfitMembers($scope.outfit)
 			.success(function(data){
 				$scope.teamName = data.outfit_list[0].name;
 				var members = data.outfit_list[0].members;
        for (var i = members.length - 1; i >= 0; i--) {
        	var member = members[i];
        	if (member.name != null){
            $scope.GeneralsFilter = $scope.GeneralsFilter+member.character_id+",";
            $scope.memberlist.push(
            {
            	name: member.name.first,
            	id: member.character_id,
            	kills: 0,
            	deaths: 0   
            });
        };
    };
});
 		}],
 		scope:{
 			side: '@',
 			outfit: '@'
 		}
 	};
 });
