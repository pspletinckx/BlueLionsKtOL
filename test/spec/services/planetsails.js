'use strict';

describe('Service: planetsails', function () {

  // load the service's module
  beforeEach(module('statelessScoreboardApp'));

  // instantiate service
  var planetsails;
  beforeEach(inject(function (_planetsails_) {
    planetsails = _planetsails_;
  }));

  it('should do something', function () {
    expect(!!planetsails).toBe(true);
  });

});
