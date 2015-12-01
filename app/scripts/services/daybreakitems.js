'use strict';

/**
 * @ngdoc service
 * @name statelessScoreboardApp.daybreakItems
 * @description
 * # daybreakItems
 * Factory in the statelessScoreboardApp.
 */
 angular.module('statelessScoreboardApp')
 .factory('daybreakItems',['$http', function ($http) {
  return {
    itemName: function (itemNumber) {
      return $http({
      	cache:true,
        method:"GET",
        url: "https://census.daybreakgames.com/s:BlueLegacy/get/ps2/item?item_id="+itemNumber
      });
    }
  };
}]);
