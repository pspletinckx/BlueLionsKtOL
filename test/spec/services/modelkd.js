'use strict';

describe('Service: modelKD', function () {

  // load the service's module
  beforeEach(module('statelessScoreboardApp'));

  // instantiate service
  var modelKD;
  beforeEach(inject(function (_modelKD_) {
    modelKD = _modelKD_;
  }));

  it('should do something', function () {
    expect(!!modelKD).toBe(true);
  });

});
