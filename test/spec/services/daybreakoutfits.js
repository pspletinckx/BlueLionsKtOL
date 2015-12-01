'use strict';

describe('Service: daybreakOutfits', function () {

  // load the service's module
  beforeEach(module('statelessScoreboardApp'));

  // instantiate service
  var daybreakOutfits;
  beforeEach(inject(function (_daybreakOutfits_) {
    daybreakOutfits = _daybreakOutfits_;
  }));

  it('should do something', function () {
    expect(!!daybreakOutfits).toBe(true);
  });

});
