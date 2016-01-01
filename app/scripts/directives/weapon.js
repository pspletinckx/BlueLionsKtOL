'use strict';

/**
 * @ngdoc directive
 * @name statelessScoreboardApp.directive:weapon
 * @description
 * # weapon
 */
angular.module('statelessScoreboardApp')
  .directive('weapon', function (daybreakItems) {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        //element.text(attrs.nr);
       // console.log(attrs.nr);
       if (attrs.nr == 0){
         element.text("weapon");
         return;
       }

      daybreakItems.itemName(attrs.nr)
      .success(function(data){
      	if(data.item_list.length>0){
	        element.text(data.item_list[0].name.en);
	        //console.log(data);
   		}
      });
      }
    };
  });
