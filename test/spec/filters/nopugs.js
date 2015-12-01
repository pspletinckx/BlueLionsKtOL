'use strict';

describe('Filter: noPugs', function () {

  // load the filter's module
  beforeEach(module('statelessScoreboardApp'));

  // initialize a new instance of the filter before each test
  var noPugs;
  beforeEach(inject(function ($filter) {
    noPugs = $filter('noPugs');
  }));

  it('should return the input prefixed with "noPugs filter:"', function () {
    var text = 'angularjs';
    expect(noPugs(text)).toBe('noPugs filter: ' + text);
  });

});
