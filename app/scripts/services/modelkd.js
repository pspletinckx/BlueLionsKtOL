'use strict';

/**
 * @ngdoc service
 * @name statelessScoreboardApp.modelKD
 * @description
 * # modelKD
 * Factory in the statelessScoreboardApp.
 */
angular.module('statelessScoreboardApp')
  .factory('modelKD', function () {
    var lookuptable = new Map ([
        [5428010618035982689,"Bullet0Storm"]
    ]);




    // Public API here
    return {
      getPlayername : function(id){
        lookuptable.get(id);
      },
      setPlayername : function (id, name){
        lookuptable.set(id,name);
      },
      onlyRelevant : function(value, index, array){
         if ( lookuptable.has(value.killer)&&lookuptable.has(value.target)){
          return true;
        }
        else return false;
      }
    }
});
