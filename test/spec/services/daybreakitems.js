'use strict';

describe('Service: daybreakItems', function () {

  // load the service's module
  beforeEach(module('statelessScoreboardApp'));

  // instantiate service
  var daybreakItems;
  beforeEach(inject(function (_daybreakItems_) {
    daybreakItems = _daybreakItems_;
  }));

  it('should do something', function () {
    expect(!!daybreakItems).toBe(true);
  });

});
