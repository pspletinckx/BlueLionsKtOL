'use strict';

describe('Directive: weapon', function () {

  // load the directive's module
  beforeEach(module('statelessScoreboardApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  // it('should make hidden element visible', inject(function ($compile) {
  //   element = angular.element('<weapon></weapon>');
  //   element = $compile(element)(scope);
  //   expect(element.text()).toBe('this is the weapon directive');
  // }));
});
